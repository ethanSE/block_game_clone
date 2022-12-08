import { Quaternion, Vector3 } from "three";
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

    rotate(rotation: RotationAxis): Piece {
        const rotationAxisVector = rotation === 'X' ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0)
        const rotationQuaternion = new Quaternion().setFromAxisAngle(rotationAxisVector, Math.PI / 2)

        const newCoords = this.coords.map((coord) =>
            coord.clone().applyQuaternion(rotationQuaternion).round())

        return new Piece(newCoords, this.available)
    }

    getCoords(): Coord[] {
        return this.coords
    }

    isAvailable(): boolean {
        return this.available
    }

    setUnavailable() {
        return new Piece(this.coords, false)
    }
}