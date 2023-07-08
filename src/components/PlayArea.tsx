import { ContactShadows, View } from "@react-three/drei";
import GameBoard from "./GameBoard";
import React from "react";

export function PlayArea(props: { gameAreaDivRef: React.MutableRefObject<never> }) {
    return (
        <View index={1} track={props.gameAreaDivRef}>
            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <GameBoard />
            <ShadowsOnce />
        </View>
    )
}

const ShadowsOnce = React.memo(() => {
    return <ContactShadows position={[0, -1, 0]} opacity={0.75} scale={10} blur={2.5} far={4} frames={1} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />
}, (a, b) => true);