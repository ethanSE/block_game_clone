//styles
import css from '../styles/PieceSelector.module.css'

import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";
import { Piece } from "block-game-clone-backend/types/Piece";
import { PieceName } from 'block-game-clone-backend/types/PieceName';
import PlayerIndicator from './PlayerIndicator';
import { Player } from 'block-game-clone-backend/types/Player';
import { use100vh } from 'react-div-100vh';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import corner from '../../public/pieceImages/corner.png';
import l from '../../public/pieceImages/l.png';
import left_screw from '../../public/pieceImages/left_screw.png';
import one_by_four from '../../public/pieceImages/one_by_four.png';
import one_by_three from '../../public/pieceImages/one_by_three.png';
import one_by_two from '../../public/pieceImages/one_by_two.png';
import right_screw from '../../public/pieceImages/right_screw.png';
import short_l from '../../public/pieceImages/short_l.png';
import two_by_two from '../../public/pieceImages/two_by_two.png';
import z from '../../public/pieceImages/z.png';
import t from '../../public/pieceImages/t.png';

const piece_image_source_map: Record<PieceName, string> =
{
    one_by_two: one_by_two,
    one_by_three: one_by_three,
    one_by_four: one_by_four,
    two_by_two: two_by_two,
    z: z,
    t: t,
    l: l,
    short_l: short_l,
    right_screw: right_screw,
    left_screw: left_screw,
    corner: corner
}

export default function PieceSelectorContainer(props: { state: GameState, update: (a: Action) => void }) {
    const current_player = props.state.player_state.current_player;
    const current_player_hand = props.state.player_state.players[current_player];
    const pieces = Object.entries(current_player_hand.pieces) as [PieceName, Piece | null][];

    const totalScreenHeight = use100vh();

    return (
        <>
            {totalScreenHeight &&
                <Card
                    className={css.pieceSelectorContainer}
                    style={{
                        height: (totalScreenHeight) / 2,
                        width: '100%'
                    }}
                >
                    <PieceSelectorHeader current_player={current_player} />
                    <PieceSelectorGroup pieces={pieces} current_player={current_player} update={props.update} />
                </Card>
            }
        </>
    );
}

function PieceSelectorHeader(props: { current_player: Player }) {
    return (
        <div style={{ height: "30px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            <h4>Select a Piece</h4>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <h4>Current player: </h4>
                <PlayerIndicator size={25} player={props.current_player} />
            </div>
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
        <Button
            className={css[props.status]}
            sx={{ color: '' }}
            disabled={props.status === 'unavailable'}
            onClick={() => props.status === 'available' && props.setSelected()}
            variant='contained'
        >
            <img
                src={piece_image_source_map[props.pieceName]}
                alt={props.pieceName}
                draggable="false"
            />
        </Button>
    )
}

type PieceSelectorItemProps = {
    pieceName: PieceName,
    piece: Piece | null,
    status: 'available' | 'unavailable' | 'selected',
    setSelected: () => void
}