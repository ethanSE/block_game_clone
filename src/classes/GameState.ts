import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/Either"
import { BaseTile, MovePreview, OwnedCube, PlayerID, PreviewCube } from "../types";
import { BoardState } from "./BoardState";
import { Piece, PieceName, RotationAxis } from "./Piece";
import { PlayerState } from "./PlayerState";
import { Vector3 } from "three";

export class GameState {
    constructor(
        playerState: PlayerState = new PlayerState(),
        boardState: BoardState = new BoardState(),
        previewState: O.Option<MovePreview> = O.none
    ) {
        this.playerState = playerState;
        this.boardState = boardState;
        this.previewState = previewState
    }

    private readonly playerState: PlayerState;
    private readonly boardState: BoardState;
    private readonly previewState: O.Option<MovePreview>;

    getBaseTiles(): BaseTile[] {
        return this.boardState.getPlayArea();
    }

    getInPlayCubes(): OwnedCube[] {
        return this.boardState.getInPlayCubes()
    }

    getCurrentPlayer(): PlayerID {
        return this.playerState.getCurrentPlayer();
    }

    getPlayerPieces(id: PlayerID) {
        return this.playerState.getPlayerHand(id);
    }

    getSelectedPieceCoords() {
        return this.playerState.getSelectedPieceCoords()
    }

    getSelectedPieceName() {
        return this.playerState.getSelectedPieceName()
    }

    playPreviewedPiece(): GameState {
        return O.fold(
            () => this,
            (preview: MovePreview) =>
                E.fold(
                    () => this,
                    (newCubes: readonly OwnedCube[]) => new GameState(
                        this.playerState.playSelectedPiece(),
                        this.boardState.addPieces(newCubes)
                    )
                )(preview)
        )(this.previewState)
    }

    selectPiece(piece: PieceName): GameState {
        return new GameState(this.playerState.selectPiece(piece), this.boardState);
    }

    passTurn(): GameState {
        return new GameState(this.playerState.toggleCurrentPlayer(), this.boardState);
    }

    rotateSelectedPiece(rotation: RotationAxis): GameState {
        return new GameState(this.playerState.rotateSelectedPiece(rotation), this.boardState);
    }

    setSelectedPieceOrigin(newOrigin: Vector3): GameState {
        return new GameState(this.playerState.setSelectedPieceOrigin(newOrigin), this.boardState)
    }

    previewPiece(position: Vector3): GameState {
        return O.fold(
            () => this,
            (piece: Piece) => new GameState(this.playerState, this.boardState, O.some(this.boardState.previewMove(this.getCurrentPlayer(), piece, position)))
        )(this.playerState.getSelectedPiece())
    }

    getPreviewCubes(): PreviewCube[] {
        return O.fold(
            () => [],
            (preview: MovePreview): PreviewCube[] => E.fold((a: PreviewCube[]) => a, (a: readonly OwnedCube[]): PreviewCube[] => a.map((c => ({ ...c, error: O.none }))))(preview)
        )(this.previewState)
    }
}
