import { Suspense, useRef } from 'react';
//state/context
import GameStateContext from '../context/GameStateContext';
import { useGameState } from '../hooks/useGameState';

//components
import PieceSelectorContainer from './PieceSelector';
import GameCanvas from './GameCanvas';

//styles
import '../styles/App.css';

export default function TwoPlayerLocal() {
    const gameState = useGameState()
    const gameAreaDivRef = useRef(null!)
    const pieceRotateDivRef = useRef(null!)

    return (
        <GameStateContext.Provider value={gameState}>
            <div className='website'>
                <div ref={pieceRotateDivRef} style={{ width: '100vw', height: '50%' }} />
                <div ref={gameAreaDivRef} style={{ position: 'relative', width: '100vw', height: '50%' }} />
                <GameCanvas gameAreaDivRef={gameAreaDivRef} pieceRotateDivRef={pieceRotateDivRef} />
                <PieceSelectorContainer />
            </div>
        </GameStateContext.Provider >
    )
}