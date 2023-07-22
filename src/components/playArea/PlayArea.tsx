import { View } from "@react-three/drei";
import GameBoard from "./GameBoard";
import React from "react";
import { Lighting } from "../visual/Lighting";
import { Shadows } from "../visual/Shadows";

export function PlayArea(props: { gameAreaDivRef: React.MutableRefObject<never> }) {
    return (
        <View index={1} track={props.gameAreaDivRef}>
            <Lighting />
            <Shadows />
            <GameBoard />
        </View>
    )
}