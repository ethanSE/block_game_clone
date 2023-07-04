import { Vector3 } from "three";
import { Piece, PieceName } from "../classes/Piece";
import { PlayerHand } from "../classes/PlayerHand";
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

export type PlayerID = 'p1' | 'p2';
export type OwnedCube = { position: Vector3, owner: PlayerID };
export type BaseTile = { position: [number, number] };
export type PlayerHands = Record<PlayerID, PlayerHand>
export type PiecesR = Readonly<Record<PieceName, Piece>>

export type MovePreview = E.Either<PreviewCube[], Readonly<OwnedCube[]>>
export type PreviewCube = OwnedCube & { error: O.Option<PreviewCubeError> }

export enum PreviewCubeError {
    Collision = "COLLISION",
    Unsupported = "UNSUPPORTED",
    OutOfBounds = "OUTOFBOUNDS",
    NotTouchingOwnPiece = "NOTTOUCHINGOWNPIECE"
}