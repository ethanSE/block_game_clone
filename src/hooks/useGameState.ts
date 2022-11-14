import { useReducer } from 'react';
import { Coord, PlayerID } from '../types';
import { GameState } from '../types/GameState';
import { PieceName } from '../types/PlayerHand';

export type GameStateAction =
    {
        type: 'reset'
    } | {
        type: 'add',
        position: Coord
    } | {
        type: 'passTurn'
    } | {
        type: 'selectPiece',
        player: PlayerID,
        piece: PieceName
    }

//necessary to provide type hint to tsc
export type GSReducerType = [GameState, (a: GameStateAction) => void];

export function useGameState(): GSReducerType {
    const [inPlay, dispatch] = useReducer(reducer, new GameState())

    function reducer(state: GameState, action: GameStateAction): GameState {
        switch (action.type) {
            case 'selectPiece':
                return state.selectPiece(action.player, action.piece)
            case 'add':
                return state.playSelectedPiece(action.position)
            case 'reset':
                return new GameState();
            case 'passTurn':
                return state.passTurn()
        }
    }

    return [inPlay, dispatch]
}
