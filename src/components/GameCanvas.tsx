import { Canvas } from "@react-three/fiber";
import CustomCamera from "./visual/CustomCamera";
import { PlayArea } from "./playArea/PlayArea";
import PieceRotateArea from "./pieceRotateArea/PieceRotateArea";

export default function GameCanvas(props: { gameAreaDivRef: React.MutableRefObject<never>, pieceRotateDivRef: React.MutableRefObject<never> }) {
    return (
        <Canvas eventSource={document.getElementById('root')!} className='canvas' style={{ pointerEvents: 'none' }} frameloop="demand">
            <CustomCamera />
            <PieceRotateArea pieceRotateDivRef={props.pieceRotateDivRef} />
            <PlayArea gameAreaDivRef={props.gameAreaDivRef} />
        </Canvas>
    )
}