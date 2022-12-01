import { Quaternion } from "three";
import { Coord } from "../types";
import { Piece } from "./Piece";

export type Rotation = {}

export class SelectedPiece {
    constructor(piece: Piece) {
        this.piece = piece;
    }

    private readonly piece: Piece

    // private readonly rotation: Quaternion;


    // contains a default rotation

    // rotations are applied to the rotation

    //the rotation is applied to the Piece - the piece is never changed


    applyRotation(rotation: Rotation): SelectedPiece {
        //TODO Implement

        //use Three.js quaternions
        return this;
    }

    getPositions(): Coord[] {
        //TODO Implement
        return this.piece.cubes
    }
}