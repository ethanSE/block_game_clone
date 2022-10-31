import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GS } from "../hooks/useGameState";

//Components
import Cube from "./Cube";

export default function InPlayCubes() {
    const [inPlay, _]: GS = useContext(GameStateContext)
    return (
        <mesh>
            {inPlay.map((c) => <Cube position={c} />)}
        </mesh>
    );
}
