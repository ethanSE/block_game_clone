import * as O from "fp-ts/lib/Option";
import { BaseTile, Coord, InPlayPiece, PlayerID } from "../types";
import { BoardState } from "./BoardState";
import { Piece, PieceName, RotationAxis } from "./Piece";
import { PlayerState } from "./PlayerState";
import { MovePreview } from "./MovePreview";

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

    getPieces(): InPlayPiece[] {
        return this.boardState.getPieces()
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
            (preview: MovePreview) => {
                if (preview.isValid) {
                    return new GameState(
                        this.playerState.playSelectedPiece(),
                        this.boardState.addPieces(preview.cubes.map(pc => pc.coords), this.getCurrentPlayer())
                    )
                } else {
                    return this
                }
            }
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

    setSelectedPieceOrigin(newOrigin: Coord): GameState {
        return new GameState(this.playerState.setSelectedPieceOrigin(newOrigin), this.boardState)
    }

    previewPiece(position: Coord): GameState {
        return O.fold(
            () => this,
            (piece: Piece) => new GameState(this.playerState, this.boardState, O.some(this.boardState.validatePlacement(this.getCurrentPlayer(), piece, position)))
        )(this.playerState.getSelectedPiece())
    }

    getPreviewState(): O.Option<MovePreview> {
        return this.previewState
    }
}
