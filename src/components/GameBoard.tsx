import { useContext } from "react";


//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType, GameStateAction } from "../hooks/useGameState";

//Components
import { BoardSquare } from './BoardSquare';
import InPlayPieces from "./InPlayPieces";
import { PreviewedPieceOnBoard } from "./PreviewedPieceOnBoard";
import { Vector3 } from "three";
import React from "react";
import { BaseTile } from "../types";

const defaultBoardCenterCameraOffset: Vector3 = new Vector3(-2, 0, -1.5);

export default function GameBoard() {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)
    const baseTiles = gameState.getBaseTiles()
    const inPlayCubes = gameState.getInPlayCubes()

    return (
        <group position={defaultBoardCenterCameraOffset}>
            <InPlayPieces inPlayCubes={inPlayCubes} dispatch={dispatch} />
            <BaseTiles baseTiles={baseTiles} dispatch={dispatch} />
            <PreviewedPieceOnBoard />
        </group>
    )
}


const BaseTiles = React.memo((props: { baseTiles: BaseTile[], dispatch: (gs: GameStateAction) => void }) => {
    const previewAbove = ({ position: [x, z] }: BaseTile) => props.dispatch({
        type: 'previewPiece',
        position: new Vector3(x, 0, z)
    })

    const addAbove = ({ position: [x, z] }: BaseTile) => props.dispatch({
        type: 'add',
        position: new Vector3(x, 0, z)
    })

    return (
        <>
            {
                props.baseTiles.map((item, index) =>
                    <BoardSquare
                        position={item.position}
                        key={index.toString()}
                        preview={() => previewAbove(item)}
                        add={() => addAbove(item)}
                    />)
            }
        </>
    )
}, (a, b) => true);