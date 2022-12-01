import { useContext } from "react";
import { ContactShadows } from '@react-three/drei';

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import { BoardSquare } from './BoardSquare';
import InPlayPieces from "./InPlayPieces";

export default function GameBoard() {
    return (
        <>
            <InPlayPieces />
            <BoardSquares />
        </>
    )
}


function BoardSquares() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    return (
        <>
            {gameState.getBaseTiles().map((item, index) =>
                <BoardSquare position={item.position} key={index.toString()} />)}
            <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </>
    );
}