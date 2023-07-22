import { useContext } from "react";

import * as O from 'fp-ts/Option'

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//styles
import css from '../styles/PieceSelector.module.css'
import { PlayerID } from "../types";
import { PieceName } from "../classes/Piece";

export default function PieceSelectorContainer() {
    const [_, dispatch]: GSReducerType = useContext(GameStateContext)

    return (
        <div className={css.pieceSelectorContainer}>
            <PieceSelector
                playerID='p1'
            />
            <PassTurnButton onClick={() => dispatch({ type: "passTurn" })} />
            <PieceSelector
                playerID='p2'
            />
        </div>
    );
}

function PassTurnButton(props: { onClick: () => void }) {
    return (
        <button
            onClick={props.onClick}
        >
            Pass Turn
        </button>
    )
}

function PieceSelector(props: { playerID: PlayerID }) {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)
    const isCurrentPlayer = gameState.getCurrentPlayer() === props.playerID
    const pieces = gameState.getPlayerPieces(props.playerID)
    const selectedPieceName = O.getOrElse(() => '')(gameState.getSelectedPieceName());

    return (
        <div className={isCurrentPlayer ? css[`${props.playerID}Active`] : css[props.playerID]}>
            {
                pieces.map(([pieceName, piece]) =>
                    <PieceSelectorItem
                        key={`${pieceName}${props.playerID}`}
                        pieceName={pieceName}
                        status={isCurrentPlayer && pieceName === selectedPieceName ? 'selected' : piece.isAvailable() ? 'available' : 'unavailable'}
                        setSelected={() => isCurrentPlayer && dispatch({ type: 'selectPiece', pieceName: pieceName })}
                    />
                )
            }
        </div>
    )
}

function PieceSelectorItem(props: PieceSelectorItemProps) {
    return (
        <div className={css[props.status]} onClick={props.setSelected}>
            <p>{props.pieceName}</p>
        </div>
    )
}

type PieceSelectorItemProps = {
    pieceName: PieceName,
    status: 'available' | 'unavailable' | 'selected',
    setSelected: () => void
}