import { toEntries } from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { Coord, PiecesR } from '../types';
import { PieceName, RotationAxis, oneByTwo, oneByThree, oneByFour, twoByTwo, Z, T, shortL, L, leftScrew, otherOne, rightScrew } from './Piece';
export class PlayerHand {
    constructor(
        hand: PiecesR = PlayerHand.defaultHand,
        selectedPiece: O.Option<PieceName> = O.none
    ) {
        this.hand = hand;
        this.selectedPiece = selectedPiece;
    }

    private readonly hand: PiecesR
    private selectedPiece: O.Option<PieceName>

    rotateSelectedPiece(rotation: RotationAxis): PlayerHand {
        return O.fold(
            (): PlayerHand => this,
            (selected: PieceName) => new PlayerHand({ ...this.hand, [selected]: this.hand[selected].rotate(rotation) }, O.of(selected))
        )(this.selectedPiece)
    }

    setSelectedPieceOrigin(newOrigin: Coord): PlayerHand {
        return O.fold(
            () => this,
            (selected: PieceName) => new PlayerHand({ ...this.hand, [selected]: this.hand[selected].setOrigin(newOrigin) }, O.of(selected))
        )(this.selectedPiece)
    }

    getSelectedPieceCoords(): O.Option<Coord[]> {
        return O.map(
            (selected: PieceName) => this.hand[selected].getCoords()
        )(this.selectedPiece)
    }

    getHandList() {
        return toEntries(this.hand)
    }

    getSelectedPieceName() {
        return this.selectedPiece
    }

    getSelectedPiece() {
        return O.map(
            (selected: PieceName) => this.hand[selected]
        )(this.selectedPiece)
    }

    setSelectedPiece(pieceName: PieceName): PlayerHand {
        if (this.hand[pieceName].isAvailable()) {
            return new PlayerHand(this.hand, O.of(pieceName))
        } else {
            return this
        }
    }

    clearSelectedPiece() {
        return new PlayerHand(this.hand, O.none)
    }

    playSelectedPiece(): PlayerHand {
        return O.fold(
            () => this,
            (selected: PieceName) => new PlayerHand({ ...this.hand, [selected]: this.hand[selected].setUnavailable() }, O.none)
        )(this.selectedPiece)
    }

    static defaultHand: PiecesR =
        {
            '1x2': oneByTwo,
            '1x3': oneByThree,
            '1x4': oneByFour,
            '2x2': twoByTwo,
            'Z': Z,
            'T': T,
            'L': L,
            'shortL': shortL,
            'rightScrew': rightScrew,
            'leftScrew': leftScrew,
            'otherOne': otherOne
        }
}
