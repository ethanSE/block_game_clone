import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//styles
import css from '../styles/PieceSelector.module.css'
import { PlayerID } from "../types";
import { Piece } from "../classes/Piece";

export default function PieceSelectorContainer() {
    const [gameState]: GSReducerType = useContext(GameStateContext)
    const currentPlayer = gameState.getCurrentPlayer()
    return (
        <div className={css.pieceSelectorContainer}>
            <PieceSelector playerID='p1' currentPlayer={currentPlayer === 'p1'} />
            <PassTurnButton />
            <PieceSelector playerID='p2' currentPlayer={currentPlayer === 'p2'} />
        </div>
    );
}

function PassTurnButton() {
    const [_, dispatch] = useContext(GameStateContext);
    return (
        <button
            onClick={() => dispatch({ type: "passTurn" })}
            className={css.passButton}
        >
            Pass Turn
        </button>
    )
}

function PieceSelector(props: { playerID: PlayerID, currentPlayer: boolean }) {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)
    const pieces = gameState.getPlayerPieces(props.playerID)

    return (
        <div className={props.currentPlayer ? css[`${props.playerID}Active`] : css[props.playerID]}>
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