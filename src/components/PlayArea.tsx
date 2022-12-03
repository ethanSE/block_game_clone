import { View } from "@react-three/drei";
import GameBoard from "./GameBoard";

export function PlayArea(props: { gameAreaDivRef: React.MutableRefObject<never> }) {
    return (
        <View index={1} track={props.gameAreaDivRef}>
            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <GameBoard />
        </View>
    )
}