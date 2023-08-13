//styles
import css from '../styles/PieceSelector.module.css'

import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";
import { Piece } from "block-game-clone-backend/types/Piece";
import { PieceName } from 'block-game-clone-backend/types/PieceName';
import { colors } from '../types';

export default function PieceSelectorContainer(props: { state: GameState, update: (a: Action) => void }) {
    const current_player = props.state.player_state.current_player;
    const current_player_hand = props.state.player_state.players[current_player];
    const pieces = Object.entries(current_player_hand.pieces) as [PieceName, Piece | null][];

    return (
        <div className={css.pieceSelectorContainer} >
            <div style={{ height: "30px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <h4>Select a Piece</h4>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h4>Current player: </h4>
                    <div style={{ borderRadius: "3px", marginLeft: "5px", width: "25px", height: "25px", backgroundColor: colors[current_player] }}></div>
                </div>
            </div>
            <div className={css.pieceGroup}>
                {
                    pieces.map(([pieceName, piece]: [PieceName, Piece | null]) =>
                        <PieceSelectorItem
                            key={`${pieceName}${current_player}`}
                            piece={piece}
                            status={piece ? 'available' : 'unavailable'}
                            pieceName={pieceName}
                            setSelected={() => props.update({ type: "SelectPiece", data: pieceName })}
                        />
                    )
                }
            </div>
        </div >
    );
}

function PieceSelectorItem(props: PieceSelectorItemProps) {


    //TODO - use images after dowload
    return (
        <div className={css[props.status]} onClick={() => props.status === 'available' && props.setSelected()}>
            <img style={{ width: "100%" }} src={`/block_game_clone/pieceImages/${props.pieceName}.png`} alt={props.pieceName} />
        </div>
    )
}

type PieceSelectorItemProps = {
    pieceName: PieceName,
    piece: Piece | null,
    status: 'available' | 'unavailable' | 'selected',
    setSelected: () => void
}