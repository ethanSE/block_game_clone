import { useReducer } from 'react';

export type Player = 'p1' | 'p2';
export type Coord = [number, number, number];
export type InPlayCube = { position: Coord, owner: Player };

export type GameStateAction =
    {
        type: 'reset'
    } | {
        type: 'add',
        newPiece: InPlayCube
    } | {
        type: 'passTurn'
    }

export type GameState = {
    currentPlayer: 'p1' | 'p2',
    pieces: InPlayCube[]
}
export const defaultState: GameState = {
    currentPlayer: 'p1',
    pieces: []
}

//necessary to provide type hint to tsc
export type GSReducerType = [GameState, (a: GameStateAction) => void];

export function useGameState(): GSReducerType {
    const [inPlay, dispatch] = useReducer(reducer, defaultState)

    function reducer(state: GameState, action: GameStateAction): GameState {
        switch (action.type) {
            case 'add':
                return {
                    currentPlayer: state.currentPlayer === 'p1' ? 'p2' : 'p1',
                    pieces: [...state.pieces, action.newPiece]
                }
            case 'reset':
                return defaultState;
            case 'passTurn':
                return { ...state, currentPlayer: state.currentPlayer === 'p1' ? 'p2' : 'p1' }

        }
    }

    return [inPlay, dispatch]
}

