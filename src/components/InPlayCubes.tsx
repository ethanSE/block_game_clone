import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GS } from "../hooks/useGameState";

//Components
import Cube from "./Cube";

export default function InPlayCubes(props: JSX.IntrinsicElements["mesh"]) {
    const [inPlay, _]: GS = useContext(GameStateContext)
    return (
        <mesh
            {...props}
        >
            {inPlay.map((c, index: number) => <Cube position={c} key={index.toString()} />)}
        </mesh>
    );
}
