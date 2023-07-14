import { useContext } from "react";

//State/Context
import GameStateContext from "../../context/GameStateContext";
import { GSReducerType } from "../../hooks/useGameState";

//Components
import { PreviewedPieceOnBoard } from "../PreviewedPieceOnBoard";
import { Vector3 } from "three";
import { BaseTiles } from "./BaseTiles";
import CubesOnBoard from "./CubesOnBoard";
import { BaseTile } from "../../types";

const defaultBoardCenterCameraOffset: Vector3 = new Vector3(-2, 0, -1.5);

export default function GameBoard() {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)
    const baseTiles = gameState.getBaseTiles()
    const inPlayCubes = gameState.getInPlayCubes()

    const onCubeHover = (coord: Vector3) =>
        dispatch(
            {
                type: 'previewPiece',
                position: coord.clone().add(new Vector3(0, 1, 0)).round()
            }
        )


    const onCubeClick = (coord: Vector3) =>
        dispatch(
            {
                type: 'add',
                position: coord.clone().add(new Vector3(0, 1, 0)).round()
            }
        )

    const onBaseTileHover = ({ position: [x, z] }: BaseTile) =>
        dispatch(
            {
                type: 'previewPiece',
                position: new Vector3(x, 0, z)
            }
        )


    const onBaseTileClick = ({ position: [x, z] }: BaseTile) => dispatch(
        {
            type: 'add',
            position: new Vector3(x, 0, z)
        })

    return (
        <group position={defaultBoardCenterCameraOffset}>
            <BaseTiles baseTiles={baseTiles} onClick={onBaseTileClick} onHover={onBaseTileHover} />
            <CubesOnBoard inPlayCubes={inPlayCubes} onClick={onCubeClick} onHover={onCubeHover} />
            <PreviewedPieceOnBoard />
        </group>
    )
}


