import { Center, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";
import { PlayerID } from "../types";
import CustomCamera from "./CustomCamera";
import PreviewedPiece from "./previewedPiece";
import { ThreeEvent } from '@react-three/fiber'

export function PiecePreviewContainer() {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)

    const currentPlayer = gameState.getCurrentPlayer()
    const selectedPiece = gameState.getSelectedPiece()

    return (
        <div style={{ backgroundColor: 'teal', width: '100wv', display: 'flex', justifyContent: 'space-between' }}>
            <PiecePreviewer playerID={currentPlayer} />
        </div>
    )
}

function PiecePreviewer(props: { playerID: PlayerID }) {
    const maxVerticalViewAngle = (Math.PI / 2) * .9;

    const capturePointerMove = (e: Event) => console.log(e.type)

    return (
        <div style={{
            backgroundColor: 'tan', width: '150px', height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Canvas>
                <OrthographicCamera />
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <PreviewedPiece />
            </Canvas >
        </div>
    )
}