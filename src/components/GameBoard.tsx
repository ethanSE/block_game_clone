import { useContext } from "react";
import { Center, ContactShadows } from '@react-three/drei';

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import { BoardSquare } from './BoardSquare';
import InPlayPieces from "./InPlayPieces";
import { PreviewedPieceOnBoard } from "./PreviewedPieceOnBoard";

export default function GameBoard() {

    return (
        <>
            {/* <Center> */}
            <InPlayPieces />
            <BaseTiles />
            {/* </Center> */}

            <PreviewedPieceOnBoard />
            <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </>
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
        </>
    )
}