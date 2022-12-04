import { PlayerID, Coord } from "../types";
import { PieceName, RotationAxis } from "./Piece";
import { PlayerHand } from "./PlayerHand";
import * as O from 'fp-ts/Option'
export class PlayerState {
    constructor(
        currentPlayer: PlayerID = 'p1',
        player1Hand: PlayerHand = PlayerHand.new(),
        player2Hand: PlayerHand = PlayerHand.new()
    ) {
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

    private getOtherPlayer(): PlayerID {
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

    rotateSelectedPiece(rotation: RotationAxis): PlayerState {
        if (this.currentPlayer === 'p1') {
            return new PlayerState(this.currentPlayer, this.p1.rotateSelectedPiece(rotation), this.p2);
        } else {
            return new PlayerState(this.currentPlayer, this.p1, this.p2.rotateSelectedPiece(rotation))
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
}
