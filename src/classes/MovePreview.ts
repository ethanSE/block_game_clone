import { Coord } from "../types"

export type MovePreview = {
    isValid: boolean,
    cubes: PreviewCube[]
}

export type PreviewCube = {
    validity: Validity,
    coords: Coord
}

export enum Validity {
    Valid = "VALID",
    Collision = "COLLISION",
    Unsupported = "UNSUPPORTED",
    OutOfBounds = "OUTOFBOUNDS",
    NotTouchingOwnPiece = "NOTTOUCHINGOWNPIECE"
}