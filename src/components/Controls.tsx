import { Action } from "block-game-clone-backend/types/Action";

import css from "../styles/Controls.module.css"
import { GameState } from "block-game-clone-backend/types/GameState";
import PieceSelectorContainer from "./PieceSelector";
import { useContext } from "react";
import { ShowAvailableSpaceContext } from "./Game";

const Controls = (props: { gameState: GameState, update: (a: Action) => void }) => {
    const selected_piece = props.gameState.player_state.players[props.gameState.player_state.current_player].selected_piece;

    return (
        <>
            <TopControls
                update={props.update}
            />
            <div className={css.bottomControls}>{
                (selected_piece === null) ?
                    <PieceSelectorContainer state={props.gameState} update={props.update} /> :
                    <BottomControls update={props.update} />
            }
            </ div >
        </>
    );
}

export default Controls;

const TopControls = (props: { update: (a: Action) => void }) => {
    const { showAvailableSpace, setShowAvailableSpace } = useContext(ShowAvailableSpaceContext);

    return (
        <div className={css.topControls}>
            <button className={css.button1} onClick={() => props.update({ type: "PlayPreviewedPiece" })}>Play</button>
            <button className={css.button2} onClick={() => setShowAvailableSpace(!showAvailableSpace)}>{`${showAvailableSpace ? 'Hide' : 'Show'} available space`}</button>
        </div>
    )
}

const BottomControls = (props: { update: (a: Action) => void }) => {
    return (
        <>
            <button className={css.button3} onClick={() => props.update({ type: "PassTurn" })}>Pass Turn</button>
            <button className={css.button4} onClick={() => props.update({ type: "ClearSelectedPiece" })}>Switch Piece</button>
        </>
    )
}