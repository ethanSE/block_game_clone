//styles
import css from '../styles/PieceSelector.module.css'

import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";
import { PlayerHandState } from "block-game-clone-backend/types/PlayerHandState";
import { Piece } from "block-game-clone-backend/types/Piece";
import { PieceName } from 'block-game-clone-backend/types/PieceName';
import { Player } from 'block-game-clone-backend/types/Player';
import { useContext } from 'react';
import { ShowAvailableSpaceContext } from './Game';

export default function PieceSelectorContainer(props: { state: GameState, update: (a: Action) => void }) {
    const { showAvailableSpace, setShowAvailableSpace } = useContext(ShowAvailableSpaceContext);

    return (
        <div className={css.pieceSelectorContainer}>
            <PieceSelector
                hand={props.state.player_state.players["p1"]}
                update={props.update}
                playerID='p1'
                active={props.state.player_state.current_player === 'p1'}
            />
            <CButton label={"Pass Turn"} onClick={() => props.update({ type: 'PassTurn' })} />
            <CButton label={"toggle view available space"} onClick={() => setShowAvailableSpace(!showAvailableSpace)} />
            <CButton label={"Play Piece"} onClick={() => props.update({ type: 'PlayPreviewedPiece' })} />
            <PieceSelector
                hand={props.state.player_state.players["p2"]}
                update={props.update}
                playerID='p2'
                active={props.state.player_state.current_player === 'p2'} />
        </div>
    );
}

function CButton(props: { label: string, onClick: () => void }) {
    return (
        <button
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}



function PieceSelector(props: { hand: PlayerHandState, update: (a: Action) => void, playerID: Player, active: boolean }) {
    const pieces = Object.entries(props.hand.pieces) as [PieceName, Piece | null][];
    const selectedPieceName = props.hand.selected_piece;

    return (
        <div className={props.active ? css[`${props.playerID}Active`] : css[props.playerID]}>
            {
                pieces.map(([pieceName, piece]: [PieceName, Piece | null]) =>
                    <PieceSelectorItem
                        key={`${pieceName}${props.playerID}`}
                        pieceName={pieceName}
                        status={props.active && pieceName === selectedPieceName ? 'selected' : piece ? 'available' : 'unavailable'}
                        setSelected={() => props.active && props.update({
                            type: "SelectPiece",
                            data: pieceName
                        })}
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