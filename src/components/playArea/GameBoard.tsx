//Components
import { PreviewedPieceOnBoard } from "../PreviewedPieceOnBoard";
import { BaseTiles } from "./BaseTiles";
import CubesOnBoard from "./CubesOnBoard";
import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";
import { Vector3 } from "three";
import { Shadows } from "../visual/Shadows";
import AvailableBuildSpace from "./AvailableBuildSpace";

export default function GameBoard(props: { gameState: GameState, update: (a: Action) => void }) {
    let center = props.gameState.board_state.board.center;
    const cameraOffset = new Vector3().fromArray(center).negate();

    return (
        <>
            <group position={cameraOffset}>
                <BaseTiles boardState={props.gameState.board_state} update={props.update} />
                <CubesOnBoard boardState={props.gameState.board_state} update={props.update} />
                <PreviewedPieceOnBoard gameState={props.gameState} />
                <AvailableBuildSpace boardState={props.gameState.board_state} />
            </group>
            <group position={[0, -0.75, 0]}>
                <Shadows />
            </group>
        </>
    )
}
