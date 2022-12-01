import { PlayerID, PlayerHands, Coord } from "../types";
import { PieceName } from "./Piece";
import { PlayerHand } from "./PlayerHand";
import { Rotation } from "./SelectedPiece";
import * as O from 'fp-ts/Option'
export class PlayerState {
    constructor(
        currentPlayer: PlayerID = 'p1',
        player1Hand: PlayerHand = new PlayerHand(),
        player2Hand: PlayerHand = new PlayerHand()) {
        this.currentPlayer = currentPlayer;
        this.p1 = player1Hand;
        this.p2 = player2Hand
    }

    private readonly currentPlayer: PlayerID;
    private readonly p1: PlayerHand;
    private readonly p2: PlayerHand;

    getCurrentPlayer(): PlayerID {
        return this.currentPlayer;
    }

    getOtherPlayer(): PlayerID {
        return this.currentPlayer === 'p1' ? 'p2' : 'p1'
    }

    toggleCurrentPlayer(): PlayerState {
        return new PlayerState(this.getOtherPlayer(), this.p1.clearSelectedPiece(), this.p2.clearSelectedPiece())
    }

    getPlayerHand(id: PlayerID) {
        return id === 'p1' ? this.p1.getHandList() : this.p2.getHandList();
    }

    selectPiece(piece: PieceName): PlayerState {
        if (this.currentPlayer === 'p1') {
            return new PlayerState(this.currentPlayer, this.p1.setSelectedPiece(piece), this.p2);
        } else {
            return new PlayerState(this.currentPlayer, this.p1, this.p2.setSelectedPiece(piece));
        }
    }

    getSelectedPieceName() {
        return this.currentPlayer === 'p1' ? this.p1.getSelectedPieceName() : this.p2.getSelectedPieceName()
    }

    rotateSelectedPiece(rotation: Rotation): PlayerState {
        if (this.currentPlayer === 'p1') {
            return new PlayerState(this.currentPlayer, this.p1.rotateSelectedPiece(rotation), this.p2);
        } else {
            return new PlayerState(this.currentPlayer, this.p1, this.p1.rotateSelectedPiece(rotation))
        }
    }

    playSelectedPiece(): PlayerState {
        let newP1Hand;
        let newP2Hand;

        if (this.currentPlayer === 'p1') {
            newP1Hand = this.p1.playSelectedPiece()
            newP2Hand = this.p2;
        } else {
            newP1Hand = this.p1
            newP2Hand = this.p2.playSelectedPiece()
        }

        return new PlayerState(this.getOtherPlayer(), newP1Hand, newP2Hand)
    }

    getSelectedPieceCoords(): O.Option<Coord[]> {
        return this[this.currentPlayer].getSelectedPieceCoords()
    }

    static initialHandState: PlayerHands = { 'p1': new PlayerHand(), 'p2': new PlayerHand() } as const
}
