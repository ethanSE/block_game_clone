import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//styles
import css from '../styles/PieceSelector.module.css'
import { PlayerID } from "../types";
import { Piece } from "../classes/Piece";

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

function PassTurnButton(props: { onClick: GSReducerType[1] }) {
    return (
        <button
            onClick={() => props.onClick}
            className={css.passButton}
        >
            Pass Turn
        </button>
    )
}

function PieceSelector(props: { playerID: PlayerID }) {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)
    const currentPlayer = gameState.getCurrentPlayer()
    const pieces = gameState.getPlayerPieces(props.playerID)

    return (
        <div className={currentPlayer === props.playerID ? css[`${props.playerID}Active`] : css[props.playerID]}>
            {
                pieces.map((piece) =>
                    <PieceSelectorItem
                        key={`${piece.name}${props.playerID}`}
                        piece={piece}
                        playerID={props.playerID}
                        setSelected={() => dispatch({ type: 'selectPiece', player: props.playerID, piece: piece.name })}
                    />
                )
            }
        </div>
    )
}

function PieceSelectorItem(props: PieceSelectorItemProps) {
    return (
        <div className={css[props.piece.status]} onClick={props.setSelected}>
            <p>{props.piece.name}</p>
        </div>
    )
}

type PieceSelectorItemProps = {
    piece: Piece,
    playerID: PlayerID,
    setSelected: () => void
}