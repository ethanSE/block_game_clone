import { Action } from "block-game-clone-backend/types/Action";

import css from "../styles/GameControls.module.css"
import { GameState } from "block-game-clone-backend/types/GameState";
import PieceSelectorContainer from "./PieceSelector";
import { useContext } from "react";
import { ShowAvailableSpaceContext } from "./Game";
import PlayerIndicator from "./PlayerIndicator";

const GameControls = (props: { gameState: GameState, update: (a: Action) => void }) => {
    const selected_piece = props.gameState.player_state.players[props.gameState.player_state.current_player].selected_piece;

    return (
        <div className={css.controlsContainer}>
            <div style={{ flex: "1" }} >
                <TopControls
                    gameState={props.gameState}
                    update={props.update}
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

const TopControls = (props: { gameState: GameState, update: (a: Action) => void }) => {
    const { showAvailableSpace, setShowAvailableSpace } = useContext(ShowAvailableSpaceContext);

    return (
        <div className={css.topControls}>
            <button className={css.button} onClick={() => setShowAvailableSpace(!showAvailableSpace)}>{`${showAvailableSpace ? 'Hide' : 'Show'} available space`}</button>
            <Score p1score={props.gameState.score.p1} p2score={props.gameState.score.p2} />
            <button className={css.button} onClick={() => props.update({ type: "PlayPreviewedPiece" })}>Play</button>
        </div>
    )
}

const Score = (props: { p1score: number, p2score: number }) => {
    return (
        <div className={css.scoreContainer}>
            <h1>Score</h1>
            <div style={{ marginLeft: "10px" }}>
                <div className={css.scoreRow}>
                    <PlayerIndicator player={"p1"} size={25} />
                    <h2>{props.p1score}</h2>
                </div>
                <div className={css.scoreRow}>
                    <PlayerIndicator player={"p2"} size={25} />
                    <h2>{props.p2score}</h2>
                </div>
            </div>
        </div>
    )
}

const BottomControls = (props: { update: (a: Action) => void }) => {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <button className={css.button} onClick={() => props.update({ type: "PassTurn" })}>Pass Turn</button>
            <button className={css.button} onClick={() => props.update({ type: "ClearSelectedPiece" })}>Switch Piece</button>
        </div>
    )
}