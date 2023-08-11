//Components
import { PreviewedPieceOnBoard } from "../PreviewedPieceOnBoard";
import { BaseTiles } from "./BaseTiles";
import CubesOnBoard from "./CubesOnBoard";
import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";
import BuildHeightLimitIndicators from "./BuildHeightLimitIndicators";
import { Vector3 } from "three";
import { Shadows } from "../visual/Shadows";
import { Box, ContactShadows } from "@react-three/drei";

export default function GameBoard(props: { gameState: GameState, update: (a: Action) => void }) {
    let a = props.gameState.board_state.pieces.center;
    const cameraOffset = new Vector3().fromArray(a).negate();

    return (
        <>
            <group position={cameraOffset}>
                <BaseTiles boardState={props.gameState.board_state} update={props.update} />
                <CubesOnBoard boardState={props.gameState.board_state} update={props.update} />
                <PreviewedPieceOnBoard gameState={props.gameState} />
                <BuildHeightLimitIndicators boardState={props.gameState.board_state} />
            </group>
            <group position={[0, -0.75, 0]}>
                <Shadows />
            </group>
        </>
    )
}
