import { createContext, useMemo, useRef, useState } from 'react';
//hooks
import { useGameState } from '../hooks/useGameState';

//components
import PieceSelectorContainer from './PieceSelector';
import { Canvas } from '@react-three/fiber';
import PieceRotateArea from './pieceRotateArea/PieceRotateArea';
import { PlayArea } from './playArea/PlayArea';
import CustomCamera from './visual/CustomCamera';

//styles
import css from '../styles/Game.module.css'
import { GameMode } from 'block-game-clone-backend/types/GameMode';

export const ShowAvailableSpaceContext = createContext({ showAvailableSpace: false, setShowAvailableSpace: (_: boolean) => { } });

export default function Game(props: { mode: GameMode }) {
    console.log(props.mode)
    const { state, update } = useGameState(props.mode)

    const [showAvailableSpace, setShowAvailableSpace] = useState(false);
    const gameAreaDivRef = useRef(null!)
    const pieceRotateDivRef = useRef(null!)
    const containerDivRef = useRef(null!)

    return (
        <div className={css.website}>
            {state &&
                <ShowAvailableSpaceContext.Provider value={{ showAvailableSpace, setShowAvailableSpace }}>
                    <div ref={containerDivRef} className={css.canvasContainer} >
                        <div ref={pieceRotateDivRef} className={css.canvasSection} style={{ backgroundColor: 'teal' }} />
                        <div ref={gameAreaDivRef} className={css.canvasSection} />
                        <Canvas eventSource={containerDivRef} style={{ position: 'absolute' }} frameloop="demand">
                            <CustomCamera />

                            <PieceRotateArea playerState={state.player_state} update={update} pieceRotateDivRef={pieceRotateDivRef} />
                            <PlayArea gameState={state} update={update} gameAreaDivRef={gameAreaDivRef} />

                        </Canvas>
                    </div>
                    <PieceSelectorContainer state={state} update={update} />
                </ShowAvailableSpaceContext.Provider>
            }
        </div >
    )
}