import { Action } from "block-game-clone-backend/types/Action";

import css from "../styles/GameControls.module.css"
import { GameState } from "block-game-clone-backend/types/GameState";
import PieceSelectorContainer from "./PieceSelector";
import { useContext } from "react";
import { ShowAvailableSpaceContext } from "./Game";
import PlayerIndicator from "./PlayerIndicator";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CubeError } from "block-game-clone-backend/types/CubeError";

const GameControls = (props: {
    gameState: GameState,
    update: (a: Action) => void,
    error: CubeError | null | undefined
}) => {
    const selected_piece = props.gameState.player_state.players[props.gameState.player_state.current_player].selected_piece;

    return (
        <div className={css.controlsContainer}>
            <div style={{ flex: "1" }} >
                <TopControls
                    gameState={props.gameState}
                    update={props.update}
                    error={props.error}
                />
            </div>
            <div className={css.bottomControls}>
                {
                    (selected_piece === null) ?
                        <PieceSelectorContainer state={props.gameState} update={props.update} /> :
                        <BottomControls update={props.update} />
                }
            </ div >
        </div>
    );
}

export default GameControls;

const TopControls = (props: {
    gameState: GameState,
    update: (a: Action) => void,
    error: CubeError | null | undefined
}) => {
    const { showAvailableSpace, setShowAvailableSpace } = useContext(ShowAvailableSpaceContext);

    return (
        <div className={css.topControls} >
            <Button
                sx={{ height: 50, width: 85, margin: 1 }}
                variant='contained'
                onClick={() => setShowAvailableSpace(!showAvailableSpace)}>
                <Typography variant="button" sx={{ scale: 0.75 }}>
                    {`${showAvailableSpace ? 'Hide' : 'Show'} available space`}
                </Typography>
            </Button>

            <Score p1score={props.gameState.score.p1} p2score={props.gameState.score.p2} />

            <Button
                sx={{ height: 50, width: 85, margin: 1 }}
                variant="contained"
                onClick={() => props.update({ type: "PlayPreviewedPiece" })}
                disabled={!props.gameState.board_state.previewed_piece || (!!props.error)}
            >
                <Typography variant="button">
                    Play
                </Typography>
            </Button>
        </div >
    )
}

const Score = (props: { p1score: number, p2score: number }) => {
    return (
        <div className={css.scoreContainer}>

            <div className={css.scoreRow}>
                <h2>{props.p1score}</h2>
                <PlayerIndicator player={"p1"} size={25} />
            </div>
            <div style={{ height: 30, width: 3, borderRadius: 2, backgroundColor: 'black', margin: 5 }} />
            <div className={css.scoreRow}>
                <PlayerIndicator player={"p2"} size={25} />
                <h2>{props.p2score}</h2>
            </div>

        </div>
    )
}

const BottomControls = (props: { update: (a: Action) => void }) => {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button
                sx={{ margin: 1 }}
                variant="contained"
                className={css.button}
                onClick={() => props.update({ type: "PassTurn" })}
            >Pass Turn
            </Button>
            <Button
                sx={{ margin: 1 }}
                variant="contained"
                className={css.button}
                onClick={() => props.update({ type: "ClearSelectedPiece" })}
            >
                Switch Piece
            </Button>
        </div>
    )
}