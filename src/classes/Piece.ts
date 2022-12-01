import { Coord } from "../types"

export type PieceName =
    '1x2'
    | '1x3'
    | '1x4'
    | '2x2'
    | 'Z'
    | 'T'
    | 'L'
    | 'shortL'
    | 'rightScrew'
    | 'leftScrew'
    | 'otherOne'

export type Piece = {
    name: PieceName,
    status: Status,
    readonly cubes: Coord[]
}

export type Status = 'available' | 'selected' | 'unavailable';