import { useContext } from "react";
import * as O from 'fp-ts/Option'

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import { PlayerID } from "../types";
import { Center } from "@react-three/drei";
import { Vector3 } from "three";

export default function PreviewedPiece() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    const coords = O.getOrElse(() => [] as Vector3[])(gameState.getSelectedPieceCoords())
    const currentPlayer = gameState.getCurrentPlayer()

    return (
        <Center>
            <group>
                {coords.map((coord) => <PreviewCube
                    key={JSON.stringify(coord)}
                    position={coord}
                    owner={currentPlayer}
                />)}
            </group>
        </Center >
    );
}

function PreviewCube(props: { position: Vector3, owner: PlayerID }) {
    const [_, dispatch] = useContext(GameStateContext)
    const color = props.position.equals(new Vector3(0, 0, 0)) ? "#004500" : props.owner === 'p1' ? "#000080" : "#008000"

    return (
        <mesh
            position={props.position}
            onPointerOver={(event) => {
                event.stopPropagation();
            }}
            onClick={(e) => {
                e.stopPropagation();
                dispatch({ 'type': 'setSelectedPieceOrigin', newOrigin: props.position })
            }}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}