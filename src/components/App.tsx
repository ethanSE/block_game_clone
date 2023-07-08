import { Suspense, useRef } from 'react';
//state/context
import GameStateContext from '../context/GameStateContext';
import { useGameState } from '../hooks/useGameState';

//components
import PieceSelectorContainer from './PieceSelector';
import GameCanvas from './GameCanvas';

//styles
import '../styles/App.css';
import { Canvas } from '@react-three/fiber';
import { Model } from './Scene';

function App() {
    const gameState = useGameState()
    const containerDivRef = useRef(null!)
    const gameAreaDivRef = useRef(null!)
    const pieceRotateDivRef = useRef(null!)

    return (
        <GameStateContext.Provider value={gameState}>
            <Suspense>

                <Canvas>
                    <Model />
                </Canvas>
            </Suspense>
            {/* <div ref={containerDivRef} className='website'>
                <div ref={pieceRotateDivRef} style={{ width: '100vw', height: '50%' }} />
                <div ref={gameAreaDivRef} style={{ position: 'relative', width: '100vw', height: '50%' }} />
                <GameCanvas gameAreaDivRef={gameAreaDivRef} pieceRotateDivRef={pieceRotateDivRef} />
                <PieceSelectorContainer />
            </div> */}
        </GameStateContext.Provider >
    );
}

export default App;