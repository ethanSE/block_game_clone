import { Vector3 } from "three";
import { PlayerID } from "../types";
import { useContext } from "react";
import GameStateContext from "../context/GameStateContext";

export default function Piece(props: { position: Vector3, owner: PlayerID }) {
    const [_, dispatch] = useContext(GameStateContext)
    return (
        <mesh
            position={props.position}
            onPointerOver={(event) => {
                event.stopPropagation();
                dispatch({
                    type: 'previewPiece',
                    position: props.position.clone().add(new Vector3(0, 1, 0))
                })
            }}
            onClick={(e) => {
                e.stopPropagation()
                dispatch({
                    type: "add",
                    position: props.position.clone().add(new Vector3(0, 1, 0))
                })
            }}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={props.owner === 'p1' ? "#000080" : "#008000"} />
        </mesh>
    );
}
