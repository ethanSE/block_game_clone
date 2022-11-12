import { useReducer } from 'react';
import { Coord, InPlayPiece } from '../types';
import { GameState } from '../types/GameState';

export type GameStateAction =
    {
        type: 'reset'
    } | {
        type: 'add',
        position: Coord
    } | {
        type: 'passTurn'
    }


//necessary to provide type hint to tsc
export type GSReducerType = [GameState, (a: GameStateAction) => void];

export function useGameState(): GSReducerType {
    const [inPlay, dispatch] = useReducer(reducer, new GameState())

    function reducer(state: GameState, action: GameStateAction): GameState {
        switch (action.type) {
            case 'add':
                return state.addPiece(action.position)
            case 'reset':
                return new GameState();
            case 'passTurn':
                return state.passTurn()

        }
    }

    return [inPlay, dispatch]
}

