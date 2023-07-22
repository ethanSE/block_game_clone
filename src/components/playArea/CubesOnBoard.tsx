import React from "react";
import { Vector3 } from "three";

//Components
import Cube from "../Cube";
import { OwnedCube } from "../../types";

const CubesOnBoard = React.memo((props: { inPlayCubes: OwnedCube[], onHover: (v: Vector3) => void, onClick: (v: Vector3) => void }) => {
    return (
        <>
            {props.inPlayCubes.map(
                (piece) =>
                    <Cube
                        key={JSON.stringify(piece.position)}
                        position={piece.position}
                        owner={piece.owner}
                        onClick={() => props.onClick(piece.position)}
                        onHover={() => props.onHover(piece.position)}
                    />
            )}
        </>
    );
}, (a, b) => a.inPlayCubes.length === b.inPlayCubes.length)

export default CubesOnBoard