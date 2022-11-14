import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import Piece from "./Piece";

export default function InPlayPieces() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    return (
        <group>
            {gameState.getPieces().map((piece) => <Piece position={piece.position} owner={piece.owner} />)}
        </group>
    );
}
