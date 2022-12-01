//state/context
import GameStateContext from '../context/GameStateContext';
import { useGameState } from '../hooks/useGameState';

//components
import PieceSelectorContainer from './PieceSelector';

//styles
import '../styles/App.css';
import { View } from '@react-three/drei';
import { useRef } from 'react';
import PreviewedPiece from './previewedPiece';
import { Canvas, useThree } from '@react-three/fiber';
import GameBoard from './GameBoard';
import CustomCamera from './CustomCamera';

function App() {
    const gameState = useGameState()
    const containerDivRef = useRef(null!)
    const gameAreaDivRef = useRef(null!)
    const pieceRotateDivRef = useRef(null!)

    return (
        <GameStateContext.Provider value={gameState}>
            <div ref={containerDivRef} className='website'>
                <div ref={gameAreaDivRef} style={{ position: 'relative', width: '100vw', height: '50%' }} />
                <div ref={pieceRotateDivRef} style={{ width: '100vw', height: '50%' }} />
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
            <PlayArea gameAreaDivRef={props.gameAreaDivRef} />
            <PieceRotateArea pieceRotateDivRef={props.pieceRotateDivRef} />
        </>
    )
}

function PlayArea(props: { gameAreaDivRef: React.MutableRefObject<never> }) {
    return (
        <View index={1} track={props.gameAreaDivRef}>
            {/* <color attach="background" args={['#fed200']} /> */}
            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <GameBoard />
        </View>
    )
}

function PieceRotateArea(props: { pieceRotateDivRef: React.MutableRefObject<never> }) {
    const three = useThree()
    console.log(three)
    return (
        <View index={2} track={props.pieceRotateDivRef}>
            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            {/* <color attach="background" args={['#aaa650']} /> */}
            <PreviewedPiece />
        </View>
    )
}

export default App;