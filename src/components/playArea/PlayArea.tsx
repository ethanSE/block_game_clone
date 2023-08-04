import { View } from "@react-three/drei";
import GameBoard from "./GameBoard";
import React from "react";
import { Lighting } from "../visual/Lighting";
import { Shadows } from "../visual/Shadows";
import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";

export function PlayArea(props: { gameAreaDivRef: React.MutableRefObject<never>, gameState: GameState, update: (a: Action) => void }) {
    return (
        <View index={1} track={props.gameAreaDivRef}>
            <Lighting />
            <Shadows />
            <GameBoard gameState={props.gameState} update={props.update} />
        </View>
    )
}