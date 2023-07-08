import React from "react";
import { Vector3 } from "three";
import { GameStateAction } from "../hooks/useGameState";

//Components
import Piece from "./Piece";
import { OwnedCube } from "../types";

const InPlayPieces = React.memo((props: { inPlayCubes: OwnedCube[], dispatch: (gsa: GameStateAction) => void }) => {
    const addAbove = (coord: Vector3) => props.dispatch({ type: 'add', position: coord.clone().add(new Vector3(0, 1, 0)).round() })
    const previewAbove = (coord: Vector3) => props.dispatch({ type: 'previewPiece', position: coord.clone().add(new Vector3(0, 1, 0)).round() })
    return (
        <>
            {props.inPlayCubes.map(
                (piece) =>
                    <Piece
                        key={JSON.stringify(piece.position)}
                        position={piece.position}
                        owner={piece.owner}
                        addAbove={() => addAbove(piece.position)}
                        previewAbove={() => previewAbove(piece.position)}
                    />
            )}
        </>
    );
}, (a, b) => a.inPlayCubes.length === b.inPlayCubes.length)

export default InPlayPieces