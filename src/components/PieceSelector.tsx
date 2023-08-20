//styles
import css from '../styles/PieceSelector.module.css'

import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";
import { Piece } from "block-game-clone-backend/types/Piece";
import { PieceName } from 'block-game-clone-backend/types/PieceName';
import PlayerIndicator from './PlayerIndicator';
import { Player } from 'block-game-clone-backend/types/Player';
import { use100vh } from 'react-div-100vh';
import { TopBarHeight } from '../types';

export default function PieceSelectorContainer(props: { state: GameState, update: (a: Action) => void }) {
    const current_player = props.state.player_state.current_player;
    const current_player_hand = props.state.player_state.players[current_player];
    const pieces = Object.entries(current_player_hand.pieces) as [PieceName, Piece | null][];

    const totalScreenHeight = use100vh();

    return (
        <>
            {totalScreenHeight &&
                <div className={css.pieceSelectorContainer} style={{ height: (totalScreenHeight - TopBarHeight) / 2, width: '100%' }}>
                    <PieceSelectorHeader current_player={current_player} />
                    <PieceSelectorGroup pieces={pieces} current_player={current_player} update={props.update} />
                </div>
            }
        </>
    );
}

function PieceSelectorHeader(props: { current_player: Player }) {
    return (
        <div style={{ height: "30px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <h4>Current player: </h4>
                <PlayerIndicator size={25} player={props.current_player} />
            </div>
            <h4>Select a Piece</h4>
        </div>
    )
}

function PieceSelectorGroup(props: { pieces: [PieceName, Piece | null][], current_player: Player, update: (a: Action) => void }) {
    return (
        <div className={css.pieceGroup}>
            {
                props.pieces.map(([pieceName, piece]: [PieceName, Piece | null]) =>
                    <PieceSelectorItem
                        key={`${pieceName}${props.current_player}`}
                        piece={piece}
                        status={piece ? 'available' : 'unavailable'}
                        pieceName={pieceName}
                        setSelected={() => props.update({ type: "SelectPiece", data: pieceName })}
                    />
                )
            }
        </div>
    )
}

function PieceSelectorItem(props: PieceSelectorItemProps) {
    return (
        <img
            onClick={() => props.status === 'available' && props.setSelected()}
            className={css[props.status]}
            src={`/block_game_clone/pieceImages/${props.pieceName}.png`}
            alt={props.pieceName}
            draggable="false"
        />
    )
}

type PieceSelectorItemProps = {
    pieceName: PieceName,
    piece: Piece | null,
    status: 'available' | 'unavailable' | 'selected',
    setSelected: () => void
}