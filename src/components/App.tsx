//state/context
import GameStateContext from '../context/GameStateContext';
import { GSReducerType, useGameState } from '../hooks/useGameState';

//components
import PieceSelectorContainer from './PieceSelector';

//styles
import '../styles/App.css';
import { Billboard, Box, Plane, ScreenSpace, View } from '@react-three/drei';
import { useContext, useRef } from 'react';
import PreviewedPiece from './previewedPiece';
import { Canvas } from '@react-three/fiber';
import GameBoard from './GameBoard';
import CustomCamera from './CustomCamera';
import { Coord } from '../types';
import { Vector3 } from 'three';

function App() {
    const gameState = useGameState()
    const containerDivRef = useRef(null!)
    const gameAreaDivRef = useRef(null!)
    const pieceRotateDivRef = useRef(null!)

    return (
        <GameStateContext.Provider value={gameState}>
            <div ref={containerDivRef} className='website'>
                <div ref={pieceRotateDivRef} style={{ width: '100vw', height: '50%' }} />
                <div ref={gameAreaDivRef} style={{ position: 'relative', width: '100vw', height: '50%' }} />
                <Canvas eventSource={document.getElementById('root')!} className='canvas' style={{ pointerEvents: 'none' }}>
                    <GameCanvas gameAreaDivRef={gameAreaDivRef} pieceRotateDivRef={pieceRotateDivRef} />
                </Canvas>
                <PieceSelectorContainer />
            </div>
        </GameStateContext.Provider >
    );
}

function GameCanvas(props: { gameAreaDivRef: React.MutableRefObject<never>, pieceRotateDivRef: React.MutableRefObject<never> }) {
    return (
        <>
            <CustomCamera />
            <PieceRotateArea pieceRotateDivRef={props.pieceRotateDivRef} />
            <PlayArea gameAreaDivRef={props.gameAreaDivRef} />
        </>
    )
}

function PlayArea(props: { gameAreaDivRef: React.MutableRefObject<never> }) {
    return (
        <View index={1} track={props.gameAreaDivRef}>
            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <GameBoard />
        </View>
    )
}

function PieceRotateArea(props: { pieceRotateDivRef: React.MutableRefObject<never> }) {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)

    const plusX = () => dispatch({ type: 'rotateSelectedPiece', rotation: new Vector3(1, 0, 0) })
    const minusX = () => dispatch({ type: 'rotateSelectedPiece', rotation: new Vector3(1, 0, 0) })


    return (
        <View index={2} track={props.pieceRotateDivRef}>
            <Box
                position={[4, 0, 0]}
                onClick={plusX}
            >
                <meshBasicMaterial color="orange" />
            </Box>
            <Box
                position={[-4, 0, 0]}
                onClick={minusX}
            >
                <meshBasicMaterial color="orange" />
            </Box>

            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <PreviewedPiece />
        </View>
    )
}

export default App;