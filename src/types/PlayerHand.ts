import { toEntries, fromEntries } from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { findFirst } from 'fp-ts/Array'

export class PlayerHand {
    constructor(hand: PiecesR = PlayerHand.defaultHand) {
        this.hand = hand;
    }

    readonly hand: PiecesR

    getHand(): Piece[] {
        return toEntries(this.hand).map(([name, data]) => ({ name: name, ...data }))
    }

    getSelectedPiece() {
        return findFirst((elem: Piece) => elem.status === 'selected')(this.getHand());
    }

    setSelectedPiece(piece: PieceName): PlayerHand {
        if (this.hand[piece].status === 'available') {

            const newHand: Record<PieceName, PieceData> =
                fromEntries(toEntries(this.hand).map(
                    ([pieceName, { status, ...rest }]): [PieceName, PieceData] => {
                        if (status === 'unavailable') {
                            return [pieceName, { status, ...rest }];
                        } else if (pieceName === piece) {
                            return [pieceName, { status: 'selected', ...rest }]
                        } else {
                            return [pieceName, { status: 'available', ...rest }];
                        }
                    }
                ))

            return new PlayerHand(newHand)
        } else {
            return this
        }
    }

    playSelectedPiece(): PlayerHand {
        return pipe(
            this.getSelectedPiece(),
            O.match(
                () => new PlayerHand(this.hand),
                (selectedPiece) => new PlayerHand(
                    { ...this.hand, [selectedPiece.name]: { ...this.hand[selectedPiece.name], status: 'unavailable' } }
                )
            )
        )
    }

    clearSelectedPiece(): PlayerHand {
        return pipe(
            this.getSelectedPiece(),
            O.match(
                () => new PlayerHand(this.hand),
                (selectedPiece) => new PlayerHand(
                    { ...this.hand, [selectedPiece.name]: { ...this.hand[selectedPiece.name], status: 'available' } }
                )
            )
        )
    }

    static defaultHand: PiecesR =
        {
            'piece1': { status: 'available' },
            'piece2': { status: 'available' },
            'piece3': { status: 'available' },
            'piece4': { status: 'available' },
            'piece5': { status: 'available' },
            'piece6': { status: 'available' },
            'piece7': { status: 'available' },
            'piece8': { status: 'available' },
            'piece9': { status: 'available' },
            'piece10': { status: 'available' },
            'piece11': { status: 'available' }
        }
}

export type PiecesR = Readonly<Record<PieceName, PieceData>>

export type PieceName =
    'piece1'
    | 'piece2'
    | 'piece3'
    | 'piece4'
    | 'piece5'
    | 'piece6'
    | 'piece7'
    | 'piece8'
    | 'piece9'
    | 'piece10'
    | 'piece11'

export type PieceData = {
    status: Status
}

export type Piece = {
    name: PieceName
} & PieceData

export type Status = 'available' | 'selected' | 'unavailable';