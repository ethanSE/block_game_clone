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

export type RotationAxis = 'X' | 'Y';

export class Piece {
    constructor(coords: Coord[], available: boolean) {
        this.coords = coords
        this.available = available
    }

    private readonly coords: Coord[]
    readonly available: boolean

    //method to rotate
    //applies rotation via quaternion
    //does rounding
    rotate(rotation: RotationAxis): Piece {
        //TODO: Implement
        return new Piece(this.coords, this.available)
    }

    getCoords(): Coord[] {
        return this.coords
    }

    isAvailable(): boolean {
        console.log('in fn')
        return this.available
    }

    setUnavailable() {
        return new Piece(this.coords, false)
    }
}