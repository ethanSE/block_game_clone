import { Quaternion, Vector3 } from "three"

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

export type RotationAxis = 'X' | 'Y'

export class Piece {
    constructor(coords: Vector3[], available: boolean = true) {
        this.coords = coords
        this.available = available
    }

    private readonly coords: Vector3[]
    readonly available: boolean

    rotate(rotation: RotationAxis): Piece {
        const rotationAxisVector = rotation === 'X' ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0)
        const rotationQuaternion = new Quaternion().setFromAxisAngle(rotationAxisVector, Math.PI / 2)

        const newCoords = this.coords.map((coord) => coord.clone().applyQuaternion(rotationQuaternion).round())

        return new Piece(newCoords, this.available)
    }

    getCoords(): Vector3[] {
        return this.coords
    }

    isAvailable(): boolean {
        return this.available
    }

    setUnavailable(): Piece {
        return new Piece(this.coords, false)
    }

    move(position: Vector3): Piece {
        const newCoords = this.coords.map((c) => c.clone().add(position).round())
        return new Piece(newCoords, this.available)
    }

    setOrigin(newOrigin: Vector3): Piece {
        const newCoords = this.coords.map(c => c.clone().sub(newOrigin).round())
        return new Piece(newCoords, this.available)
    }
}

function vec3FromCoords(input: [number, number, number][]): Vector3[] {
    return input.map((coords) => new Vector3(...coords))
}

export const oneByTwo = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1]]))
export const oneByThree = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 0, 2]]))
export const oneByFour = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 0, 3]]))
export const twoByTwo = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1]]))
export const Z = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 2]]))
export const T = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 0, 2]]))
export const L = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 1, 2]]))
export const shortL = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 1, 1]]))
export const rightScrew = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 1, 1], [1, 1, 1]]))
export const leftScrew = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 1, 1], [-1, 1, 1]]))
export const otherOne = new Piece(vec3FromCoords([[0, 0, 0], [0, 0, 1], [0, 1, 1], [1, 0, 1]]))