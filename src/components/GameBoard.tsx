import { useContext } from "react";
import { Center, ContactShadows } from '@react-three/drei';

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import { BoardSquare } from './BoardSquare';
import InPlayPieces from "./InPlayPieces";
import { Vector3 } from "three";

export default function GameBoard() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)

    //not prefered long-term solution
    const negativeDefaultBoardCenter = new Vector3(-2, 0, -1.5)
    const baseTiles = gameState.getBaseTiles()
    return (
        <Center position={negativeDefaultBoardCenter}>
            <InPlayPieces />
            {
                baseTiles.map((item, index) =>
                    <BoardSquare position={item.position} key={index.toString()} />)
            }
            <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </Center>
    )
}
