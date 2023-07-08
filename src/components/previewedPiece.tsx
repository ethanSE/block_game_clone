import { useContext } from "react";
import * as O from 'fp-ts/Option'

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import { PlayerID, p1Color, p2Color } from "../types";
import { Center, Edges, RoundedBox } from "@react-three/drei";
import { Vector3 } from "three";

export default function PreviewedPiece() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    const coords = O.getOrElse(() => [] as Vector3[])(gameState.getSelectedPieceCoords())
    const currentPlayer = gameState.getCurrentPlayer()

    return (
        <Center matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined}>
            {coords.map((coord) => <PreviewCube
                key={JSON.stringify(coord)}
                position={coord}
                owner={currentPlayer}
            />)}
        </Center >
    );
}

function PreviewCube(props: { position: Vector3, owner: PlayerID }) {
    const [_, dispatch] = useContext(GameStateContext)
    const selected = props.position.equals(new Vector3(0, 0, 0))

    return (
        <>
            <RoundedBox
                args={[0.99, 0.99, 0.99]}
                radius={0.05}
                smoothness={4}
                position={props.position}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ 'type': 'setSelectedPieceOrigin', newOrigin: props.position });
                }} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} getVertexPosition={undefined}            >
                <meshPhongMaterial color={props.owner === 'p1' ? p1Color : p2Color} />
            </RoundedBox>
            {selected && <HighLightSelected />}
        </>
    );
}

function HighLightSelected() {
    return <mesh>
        <Edges
            scale={1}
            color={"black"} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial visible={false} />
    </mesh>
}