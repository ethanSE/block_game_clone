import { useContext } from "react";
import * as O from 'fp-ts/Option'

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import Piece from "./Piece";
import { Coord } from "../types";
import { Center } from "@react-three/drei";

export default function PreviewedPiece() {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)

    const coords = O.getOrElse(() => [] as Coord[])(gameState.getSelectedPieceCoords())
    const currentPlayer = gameState.getCurrentPlayer()
    return (
        <Center>
            <mesh>
                {coords.map((coord) => <Piece key={`${currentPlayer}${coord}`} position={coord} owner={currentPlayer} />)}
            </mesh>
        </Center>
    );
}