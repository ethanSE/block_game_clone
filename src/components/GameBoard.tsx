import { useContext } from "react";
import { Center, ContactShadows } from '@react-three/drei';

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import { BoardSquare } from './BoardSquare';
import InPlayPieces from "./InPlayPieces";
import { PreviewedPieceOnBoard } from "./PreviewedPieceOnBoard";
import { Vector3 } from "three";

const defaultBoardCenterCameraOffset: Vector3 = new Vector3(-2, 0, -1.5);

export default function GameBoard() {
    return (
        <group position={defaultBoardCenterCameraOffset}>
            <InPlayPieces />
            <BaseTiles />
            <PreviewedPieceOnBoard />
        </group>
    )
}


function BaseTiles() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    const baseTiles = gameState.getBaseTiles()
    return (
        <>
            {
                baseTiles.map((item, index) =>
                    <BoardSquare position={item.position} key={index.toString()} />)
            }
            <ContactShadows opacity={0.75} scale={10} blur={2.5} far={4} />
        </>
    )
}