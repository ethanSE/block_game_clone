//Components
import { PreviewedPieceOnBoard } from "../PreviewedPieceOnBoard";
import { Vector3 } from "three";
import { BaseTiles } from "./BaseTiles";
import CubesOnBoard from "./CubesOnBoard";
import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";

const defaultBoardCenterCameraOffset: Vector3 = new Vector3(-2, 0, -1.5);

export default function GameBoard(props: { gameState: GameState, update: (a: Action) => void }) {
    return (
        <group position={defaultBoardCenterCameraOffset}>
            <BaseTiles boardState={props.gameState.board_state} update={props.update} />
            <CubesOnBoard boardState={props.gameState.board_state} update={props.update} />
            <PreviewedPieceOnBoard gameState={props.gameState} />
        </group>
    )
}


