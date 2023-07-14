
import { Vector3 } from "three";

//Components
import { OwnedCube } from "../../types";
import CubesOnBoard from "../playArea/CubesOnBoard";
export const MenuDemoPieces = () => {
    const demoPieces: OwnedCube[] = [
        { owner: 'p1', position: new Vector3(0, 0, 0) },
        { owner: 'p1', position: new Vector3(1, 0, 0) },
        { owner: 'p1', position: new Vector3(2, 0, 0) },
        { owner: 'p1', position: new Vector3(1, 0, 1) },
        { owner: 'p2', position: new Vector3(2, 0, 2) },
        { owner: 'p2', position: new Vector3(2, 0, 1) },
        { owner: 'p2', position: new Vector3(1, 0, 2) },
        { owner: 'p2', position: new Vector3(2, 1, 2) },

        { owner: 'p1', position: new Vector3(0, 1.7, 1) },
        { owner: 'p1', position: new Vector3(2, 1.7, 1) },
        { owner: 'p1', position: new Vector3(1, 1.7, 1) },
        { owner: 'p1', position: new Vector3(0, 0.7, 1) }
    ]


    return (
        <CubesOnBoard inPlayCubes={demoPieces} onClick={() => { }} onHover={() => { }} />
    );
}

