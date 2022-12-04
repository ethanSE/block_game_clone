import { toEntries } from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { Coord, PiecesR } from '../types';
import { PieceName, RotationAxis, Piece } from './Piece';

export class PlayerHand {
    constructor(
        hand: PiecesR,
        selectedPiece: O.Option<PieceName>
    ) {
        this.hand = hand;
        this.selectedPiece = selectedPiece;
    }

    private readonly hand: PiecesR
    private readonly selectedPiece: O.Option<PieceName>

    rotateSelectedPiece(rotation: RotationAxis): PlayerHand {
        return O.fold(
            (): PlayerHand => this,
            (selected: PieceName) => new PlayerHand({ ...this.hand, [selected]: this.hand[selected].rotate(rotation) }, O.of(selected))
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
            '1x2': new Piece([[0, 0, 0], [0, 0, 1]], true),
            '1x3': new Piece([[0, 0, 0], [0, 0, 1], [0, 0, 2]], true),
            '1x4': new Piece([[0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 0, 3]], true),
            '2x2': new Piece([[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1]], true),
            'Z': new Piece([[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 2]], true),
            'T': new Piece([[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 0, 2]], true),
            'L': new Piece([[0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 1, 2]], true),
            'shortL': new Piece([[0, 0, 0], [0, 0, 1], [0, 1, 1]], true),
            'rightScrew': new Piece([[0, 0, 0], [0, 0, 1], [0, 1, 1], [1, 1, 1]], true),
            'leftScrew': new Piece([[0, 0, 0], [0, 0, 1], [0, 1, 1], [-1, 1, 1]], true),
            'otherOne': new Piece([[0, 0, 0], [0, 0, 1], [0, 1, 1], [1, 0, 1]], true)
        }

    static new(): PlayerHand {
        return new PlayerHand(PlayerHand.defaultHand, O.none)
    }
}
