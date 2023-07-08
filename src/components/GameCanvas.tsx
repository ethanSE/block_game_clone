import { Canvas } from "@react-three/fiber";
import CustomCamera from "./CustomCamera";
import PieceRotateArea from "./PieceRotateArea";
import { PlayArea } from "./PlayArea";

export default function GameCanvas(props: { gameAreaDivRef: React.MutableRefObject<never>, pieceRotateDivRef: React.MutableRefObject<never> }) {
    return (
        <Canvas eventSource={document.getElementById('root')!} className='canvas' style={{ pointerEvents: 'none' }} frameloop="demand">
            <CustomCamera />
            <PieceRotateArea pieceRotateDivRef={props.pieceRotateDivRef} />
            <PlayArea gameAreaDivRef={props.gameAreaDivRef} />
        </Canvas>
    )
}