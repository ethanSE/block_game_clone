import { createContext, useEffect, useState } from 'react';
//hooks
import { useGameState } from '../hooks/useGameState';

//components
import PieceRotateArea from './pieceRotateArea/PieceRotateArea';
import { PlayArea } from './playArea/PlayArea';

//styles
import { GameMode } from 'block-game-clone-backend/types/GameMode';
import GameControls from './GameControls';
import { CameraConnector } from './CameraConnector';
import css from '../styles/Game.module.css';
import Alert from '@mui/material/Alert';
import { GameState } from 'block-game-clone-backend/types/GameState';
import { CubeError } from 'block-game-clone-backend/types/CubeError';
import { AlertTitle, Button, Icon } from '@mui/material';

export const ShowAvailableSpaceContext = createContext({ showAvailableSpace: false, setShowAvailableSpace: (_: boolean) => { } });

export default function Game(props: { mode: GameMode }) {
    const { state, update } = useGameState(props.mode);
    const [showError, setShowError] = useState(true);
    const first_error = state?.board_state.previewed_piece?.find(c => c.error)?.error;
    const [showAvailableSpace, setShowAvailableSpace] = useState(false);

    useEffect(() => {
        setShowError(true)
    }, [first_error])

    return (
        <ShowAvailableSpaceContext.Provider value={{ showAvailableSpace, setShowAvailableSpace }}>
            {state &&
                <>
                    <CameraConnector
                        topDivProps={{ className: css.canvasContainer, style: { backgroundColor: 'grey' } }}
                        topContent={<PlayArea gameState={state} update={update} />}
                        bottomDivProps={{ className: css.canvasContainer, style: { backgroundColor: '#1f1f1f' } }}
                        bottomContent={<PieceRotateArea playerState={state.player_state} update={update} />}
                    />

                    <GameControls gameState={state} update={update} error={first_error} />
                    <PreviewErrorDisplay game_state={state} showError={showError} setShowError={setShowError} />
                </>
            }
        </ShowAvailableSpaceContext.Provider>
    )
}

const PreviewErrorDisplay = (props: {
    game_state: GameState,
    showError: boolean,
    setShowError: (b: boolean) => void
}) => {
    const [showExpanded, setShowExpanded] = useState(false)
    const first_error = (props.game_state.board_state.previewed_piece || []).find(c => c.error)?.error;
    useEffect(() => {
        setShowExpanded(false)
    }, [first_error])

    const formatted_errors: Record<CubeError, string> = {
        Collision: 'Can only play in open space',
        NotTouchingPiece: `Must touch own piece or opponent's piece on first turn`,
        OutOfBounds: 'All cubes must be inside the play area',
        Unsupported: 'One or more cubes is unsupported'
    }

    const formatted_error_titles: Record<CubeError, string> = {
        Collision: 'Collision',
        NotTouchingPiece: 'Not Touching',
        OutOfBounds: 'Out of bounds',
        Unsupported: 'Unsupported'
    }

    return (
        <div
            style={{ position: 'absolute', bottom: 5, left: 5, right: 5, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}
        >
            {first_error &&
                <Button style={{ pointerEvents: 'all' }}>
                    <Alert
                        onClick={() => setShowExpanded(!showExpanded)}
                        severity="warning"
                        style={{ flexShrink: 1 }}
                        onClose={showExpanded ? () => setShowExpanded(false) : undefined}
                    //action={showExpanded && <Button color='inherit' onClick={() => setShowExpanded(false)}>Close</Button>}
                    >

                        <AlertTitle>{formatted_error_titles[first_error]}</AlertTitle>
                        {showExpanded && formatted_errors[first_error]}

                    </Alert>
                </Button>
            }
        </div>
    )
}