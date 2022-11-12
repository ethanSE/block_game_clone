import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import Cube from "./Cube";

export default function InPlayCubes() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    return (
        <group>
            {gameState.getPieces().map((c) => <Cube position={c.position} owner={c.owner} />)}
        </group>
    );
}
