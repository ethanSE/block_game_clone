import * as O from "fp-ts/lib/Option";
import { BaseTile, Coord, InPlayPiece, PlayerID } from "../types";
import { BoardState } from "./BoardState";
import { PieceName } from "./Piece";
import { PlayerState } from "./PlayerState";
import { RotationAxis } from "./SelectedPiece";
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

    playSelectedPiece(position: Coord): GameState {
        const selectedPiece = this.playerState.getSelectedPiece();

        const calcNewState = () => {
            const newBoardState = new BoardState(
                this.boardState.getPlayArea(),
                this.boardState.getPieces().concat({ position, owner: this.getCurrentPlayer() })
            )

            const newPlayerState = this.playerState.playSelectedPiece()

            return new GameState(newPlayerState, newBoardState);
        }

        return O.fold(
            () => this,
            () => calcNewState()
        )(selectedPiece)
    }

    selectPiece(id: PlayerID, piece: PieceName): GameState {
        if (id === this.playerState.getCurrentPlayer()) {
            return new GameState(this.playerState.selectPiece(piece), this.boardState);
        } else {
            return this
        }
    }

    passTurn(): GameState {
        return new GameState(this.playerState.toggleCurrentPlayer(), this.boardState);
    }

    rotateSelectedPiece(rotation: RotationAxis): GameState {
        return new GameState(this.playerState.rotateSelectedPiece(rotation), this.boardState);
    }
}
