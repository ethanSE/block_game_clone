import { Quaternion, Vector3 } from "three";
import { Coord } from "../types";
import { Piece } from "./Piece";

export type RotationDirection = Vector3;

export class SelectedPiece {
    constructor(piece: Piece, rotation: Quaternion = new Quaternion()) {
        this.piece = piece;
        this.rotation = rotation;
    }

    private readonly piece: Piece
    private readonly rotation: Quaternion;

    applyRotation(rotation: RotationDirection): SelectedPiece {
        const InputRotation = new Quaternion().setFromAxisAngle(rotation, Math.PI / 2);
        const newRotation = this.rotation.clone().premultiply(InputRotation)
        return new SelectedPiece(this.piece, newRotation)
    }

    getPositions(): Coord[] {
        return this.piece.cubes.map((coord) => coord.clone().applyQuaternion(this.rotation));
    }
}