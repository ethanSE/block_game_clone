import { useRef } from 'react';
//state/context
import GameStateContext from '../context/GameStateContext';
import { useGameState } from '../hooks/useGameState';

//components
import PieceSelectorContainer from './PieceSelector';

import { Mode } from './App';
//styles
import css from '../styles/Game.module.css'

import { Canvas } from '@react-three/fiber';
import PieceRotateArea from './pieceRotateArea/PieceRotateArea';
import { PlayArea } from './playArea/PlayArea';
import CustomCamera from './visual/CustomCamera';

export default function Game(props: { mode: Mode }) {
    const gameState = useGameState(props.mode)
    const gameAreaDivRef = useRef(null!)
    const pieceRotateDivRef = useRef(null!)

    return (
        <GameStateContext.Provider value={gameState}>
            <div className={css.website}>

                <div ref={pieceRotateDivRef} className={css.canvasSection} />
                <div ref={gameAreaDivRef} className={css.canvasSection} />

                <Canvas eventSource={document.getElementById('root')!} className={css.canvas} frameloop="demand">
                    <CustomCamera />
                    <PieceRotateArea pieceRotateDivRef={pieceRotateDivRef} />
                    <PlayArea gameAreaDivRef={gameAreaDivRef} />
                </Canvas>

                <PieceSelectorContainer />
            </div>
        </GameStateContext.Provider >
    )
}