import { BaseTile, MovePreview, OwnedCube, PlayerID, PreviewCube, PreviewCubeError } from "../types";
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/Either'
import { Piece } from "./Piece";
import { Vector3 } from "three";
import { pipe } from 'fp-ts/function';

export class BoardState {
    constructor(playArea = defaultBoard, pieces: OwnedCube[] = []) {
        this.playArea = playArea;
        this.cubesInPlay = pieces;
    };

    private readonly playArea: BaseTile[];
    private readonly cubesInPlay: OwnedCube[];

    getPlayArea(): BaseTile[] {
        return [...this.playArea]
    }

    getInPlayCubes(): OwnedCube[] {
        return this.cubesInPlay;
    }

    previewMove(currentPlayer: PlayerID, newPiece: Piece, position: Vector3): MovePreview {
        const newCubes: readonly OwnedCube[] = newPiece.move(position).getCoords().map(c => ({ owner: currentPlayer, position: c }))
        const cubesInPlay = this.cubesInPlay;

        function checkAllForError(checked: PreviewCube[]): E.Either<PreviewCube[], PreviewCube[]> {
            if (checked.some(c => O.isSome(c.error))) {
                return E.left(checked)
            } else {
                return E.right(checked)
            }
        }

        //check 1: touches existing piece by same player
        //--special case: 1st player total freedom (empty board)
        //--special case: 2nd player must touch first player's piece
        function checkTouchesPiece(newCubes: Readonly<OwnedCube[]>): MovePreview {
            function touches(c1: Vector3, c2: Vector3): boolean {
                return c1.distanceTo(c2) < 1.2
            }
            if (cubesInPlay.length > 0) {
                const ownCubesInPlay = cubesInPlay.filter(c => c.owner === currentPlayer);
                const mustTouchOneOf = ownCubesInPlay.length > 0 ? ownCubesInPlay : cubesInPlay;

                if (!newCubes.some(nc => mustTouchOneOf.some((c) => touches(c.position, nc.position)))) {
                    return E.left(newCubes.map(nc => ({ ...nc, error: O.some(PreviewCubeError.NotTouchingOwnPiece) })))
                }
            }
            return E.right(newCubes)
        }

        //check 2: No cube in new piece is unsupported
        function checkSupportedAll(newCubes: Readonly<OwnedCube[]>): MovePreview {
            //new cube can be supported by previously played cube or new cube in same piece
            const allCubes = newCubes.map(c => c.position).concat(cubesInPlay.map(c => c.position))
            const checkSupported = (nc: OwnedCube): PreviewCube => {
                const below = nc.position.clone().add(new Vector3(0, -1, 0)).round();
                const onGround = nc.position.y === 0;
                const somePieceIsBelow = allCubes.some(c => c.equals(below))

                if (onGround || somePieceIsBelow) {
                    return { ...nc, error: O.none }
                } else {
                    return { ...nc, error: O.some(PreviewCubeError.Unsupported) }
                }
            }

            return checkAllForError(newCubes.map(checkSupported))
        }

        //check 3: no cube occupies the same space as an existing cube
        function checkCollisionAll(newCubes: Readonly<OwnedCube[]>): MovePreview {
            function checkCollision(nc: OwnedCube): PreviewCube {
                if (cubesInPlay.some(c => newCubes.some(nc => c.position.equals(nc.position)))) {
                    return { ...nc, error: O.some(PreviewCubeError.Collision) }
                } else {
                    return { ...nc, error: O.none }
                }
            }

            return checkAllForError(newCubes.map(checkCollision))
        }

        //check 4: all pieces must be in bounds
        function checkInBoundsAll(newCubes: readonly OwnedCube[]): MovePreview {
            function checkInBounds({ position, owner }: OwnedCube): PreviewCube {
                if (position.x >= 0 && position.x < 5 && position.z >= 0 && position.z < 4 && position.y >= 0 && position.y < 4) {
                    return { owner, position, error: O.none }
                } else {
                    return { owner, position, error: O.some(PreviewCubeError.OutOfBounds) }
                }
            }

            return checkAllForError(newCubes.map(checkInBounds))
        }

        return pipe(
            newCubes,
            checkInBoundsAll,
            E.chain(checkCollisionAll),
            E.chain(checkSupportedAll),
            E.chain(checkTouchesPiece)
        )
    }

    addPieces(newCubes: readonly OwnedCube[]): BoardState {
        return new BoardState(this.playArea, [...this.cubesInPlay, ...newCubes])
    }
}

const defaultBoard: BaseTile[] = (new Array(20).fill(0)).map((_, index) => ({ position: [index % 5, Math.floor(index / 5)] }));