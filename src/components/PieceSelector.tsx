import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//styles
import css from '../styles/PieceSelector.module.css'
import { PlayerID } from "../types";
import { Piece } from "../types/Piece";

export default function PieceSelectorContainer() {
    return (
        <div className={css.pieceSelectorContainer}>
            <PieceSelector playerID='p1' />
            <PieceSelector playerID='p2' />
        </div>
    );
}

function PieceSelector(props: { playerID: PlayerID }) {
    const [gameState, dispatch]: GSReducerType = useContext(GameStateContext)
    const pieces = gameState.getPlayerPieces(props.playerID)

    return (
        <div className={css[props.playerID]}>
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