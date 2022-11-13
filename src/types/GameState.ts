import { BaseTile, Coord, InPlayPiece, Player } from ".";
import { BoardState } from "./BoardState";
import { CurrentPlayerState } from "./CurrentPlayerState";

export class GameState {
    constructor(
        currentPlayerState: CurrentPlayerState = new CurrentPlayerState(),
        boardState: BoardState = new BoardState()
    ) {
        this.currentPlayerState = currentPlayerState;
        this.boardState = boardState
    }

    private currentPlayerState: CurrentPlayerState;
    private boardState: BoardState;

    getBaseTiles(): BaseTile[] {
        return this.boardState.getPlayArea();
    }

    getCurrentPlayer(): Player {
        return this.currentPlayerState.getCurrentPlayer();
    }

    getPieces(): InPlayPiece[] {
        return this.boardState.getPieces()
    }

    addPiece(position: Coord): GameState {
        const newBS = this.boardState.addPiece(position, this.getCurrentPlayer());
        return new GameState(this.currentPlayerState.toggleCurrentPlayer(), newBS);
    }

    passTurn(): GameState {
        return new GameState(this.currentPlayerState.toggleCurrentPlayer(), this.boardState);
    }
}
