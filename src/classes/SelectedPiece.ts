import { Quaternion, Vector3 } from "three";
import { Coord } from "../types";
import { Piece } from "./Piece";

export type RotationAxis = 'X' | 'Y';

export class SelectedPiece {
    constructor(piece: Piece, rotation: Quaternion = new Quaternion()) {
        this.piece = piece;
        this.rotation = rotation;
    }

    private readonly piece: Piece
    private readonly rotation: Quaternion;

    applyRotation(axis: RotationAxis): SelectedPiece {
        const axisVector = axis === 'X' ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0)
        const InputRotation = new Quaternion().setFromAxisAngle(axisVector, Math.PI / 2);
        const newRotation = this.rotation.clone().premultiply(InputRotation)
        return new SelectedPiece(this.piece, newRotation)
    }

    getPositions(): Coord[] {
        return this.piece.cubes.map((coord) => coord.clone().applyQuaternion(this.rotation));
    }


    //getPositionsOffsetSFromSelectedPosition(): Coord[] {}
}