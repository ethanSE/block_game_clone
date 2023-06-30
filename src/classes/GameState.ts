import * as O from "fp-ts/lib/Option";
import { BaseTile, Coord, InPlayPiece, PlayerID } from "../types";
import { BoardState } from "./BoardState";
import { Piece, PieceName, RotationAxis } from "./Piece";
import { PlayerState } from "./PlayerState";
export class GameState {
    constructor(
        playerState: PlayerState = new PlayerState(),
        boardState: BoardState = new BoardState()
    ) {
        this.playerState = playerState;
        this.boardState = boardState
    }

    private readonly playerState: PlayerState;
    private readonly boardState: BoardState;

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

    playSelectedPiece(position: Coord): GameState {
        const selectedPiece = this.playerState.getSelectedPieceName();

        return O.fold(
            () => this,
            (_) => new GameState(
                this.playerState.playSelectedPiece(),
                this.boardState.addPiece(position, this.getCurrentPlayer())
            )
        )(selectedPiece)
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

    previewPiece(position: Coord): GameState {
        return O.fold(
            () => this,
            (piece: Piece) => new GameState(this.playerState, this.boardState.previewPiece(position, piece, this.playerState.getCurrentPlayer()))
        )(this.playerState.getSelectedPiece())
    }

    getPreviewPiece(): O.Option<Piece> {
        return this.boardState.getPreviewedPiece();
    }
}
