import { Vector3 } from "three";
import { PlayerID, p1Color, p2Color } from "../types";
import { useContext } from "react";
import GameStateContext from "../context/GameStateContext";
import { RoundedBox } from "@react-three/drei";

export default function Piece(props: { position: Vector3, owner: PlayerID }) {
    const [_, dispatch] = useContext(GameStateContext)
    return (
        <RoundedBox args={[0.99, 0.99, 0.99]}
            radius={0.05}
            smoothness={4}
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
            <meshPhongMaterial color={props.owner === 'p1' ? p1Color : p2Color} />
        </RoundedBox>
    );
}
