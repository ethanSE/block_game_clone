import { toEntries, map } from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { findFirst } from 'fp-ts/Array'
import { Coord, PiecesR } from '../types';
import { Piece, PieceName, Status } from './Piece';
import { RotationAxis, SelectedPiece } from './SelectedPiece';
import { Vector3 } from 'three';

export class PlayerHand {
    constructor(
        hand: PiecesR = PlayerHand.defaultHand,
        selectedPiece?: SelectedPiece
    ) {
        this.hand = hand;
        this.selectedPiece = selectedPiece;
    }

    private readonly hand: PiecesR
    private readonly selectedPiece?: SelectedPiece

    rotateSelectedPiece(rotation: RotationAxis): PlayerHand {
        if (this.selectedPiece) {
            return new PlayerHand(this.hand, this.selectedPiece.applyRotation(rotation))
        } else {
            return this
        }
    }

    getSelectedPieceCoords(): O.Option<Coord[]> {
        return O.fromNullable(this.selectedPiece?.getPositions())
    }

    getHandList(): Piece[] {
        return toEntries(this.hand).map(([_, data]) => ({ ...data }))
    }

    getHandRecord(): PiecesR {
        return this.hand;
    }

    getSelectedPieceName() {
        return findFirst((elem: Piece) => elem.status === 'selected')(this.getHandList());
    }

    setSelectedPiece(pieceName: PieceName): PlayerHand {
        if (this.hand[pieceName].status === 'available') {
            const newHand: PiecesR =
                map(({ status, name, ...rest }: Piece): Piece => {
                    if (status === 'unavailable') {
                        return { status, name, ...rest };
                    } else if (name === pieceName) {
                        return { status: 'selected', name, ...rest }
                    } else {
                        return { status: 'available', name, ...rest }
                    }
                })(this.hand)
            return new PlayerHand(newHand, new SelectedPiece(newHand[pieceName]))
        } else {
            return this
        }
    }

    playSelectedPiece(): PlayerHand {
        return this.unsetSelectedPieceAndUpdateStatus('unavailable');
    }

    clearSelectedPiece(): PlayerHand {
        return this.unsetSelectedPieceAndUpdateStatus('available');
    }

    private unsetSelectedPieceAndUpdateStatus(newStatus: Status): PlayerHand {
        return pipe(
            this.getSelectedPieceName(),
            O.match(
                () => this,
                (selectedPiece) => new PlayerHand({ ...this.hand, [selectedPiece.name]: { ...this.hand[selectedPiece.name], status: newStatus } })
            )
        )
    }

    static defaultHand: PiecesR =
        {
            '1x2': {
                name: '1x2', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1)]
            },
            '1x3': { name: '1x3', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 0, 2)] },
            '1x4': { name: '1x4', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 0, 2), new Vector3(0, 0, 3)] },
            '2x2': { name: '2x2', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 0), new Vector3(0, 1, 1)] },
            'Z': { name: 'Z', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 1), new Vector3(0, 1, 2)] },
            'T': { name: 'T', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 1), new Vector3(0, 0, 2)] },
            'L': { name: 'L', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 0, 2), new Vector3(0, 1, 2)] },
            'shortL': { name: 'shortL', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 1)] },
            'rightScrew': { name: 'rightScrew', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 1), new Vector3(1, 1, 1)] },
            'leftScrew': { name: 'leftScrew', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 1), new Vector3(-1, 1, 1)] },
            'otherOne': { name: 'otherOne', status: 'available', cubes: [new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 1), new Vector3(1, 0, 1)] }
        }
}
