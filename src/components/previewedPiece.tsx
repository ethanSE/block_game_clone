import { useContext } from "react";
import * as O from 'fp-ts/Option'

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import Piece from "./Piece";
import { Coord } from "../types";
import { Box, Center } from "@react-three/drei";
import { Vector3 } from "three";

export default function PreviewedPiece() {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)
    const coords = O.getOrElse(() => [] as Coord[])(gameState.getSelectedPieceCoords())
    const currentPlayer = gameState.getCurrentPlayer()

    const rotateY = () => dispatch({ type: 'rotateSelectedPiece', rotation: new Vector3(0, 1, 0) })

    return (
        <>
            <Box
                onClick={rotateY}
                position={[0, 3, 0]}
            >
                <meshBasicMaterial color="hotpink" />
            </Box>
            <Center>
                <group>
                    {coords.map((coord) => <Piece key={JSON.stringify(coord)} position={coord} owner={currentPlayer} />)}
                </group>
            </Center >
        </>
    );
}