import { Player } from ".";

export class CurrentPlayerState {
    constructor(currentPlayer: Player = 'p1') {
        this.currentPlayer = currentPlayer
    }
    private currentPlayer: Player;

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    toggleCurrentPlayer(): CurrentPlayerState {
        return new CurrentPlayerState(this.currentPlayer === 'p1' ? 'p2' : 'p1')
    }
}