import { useReducer } from 'react';
import { Coord, PlayerID } from '../types';
import { GameState } from '../classes/GameState';
import { PieceName, RotationAxis } from '../classes/Piece';

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
        pieceName: PieceName
    } | {
        type: 'rotateSelectedPiece'
        axis: RotationAxis
    }

//necessary to provide type hint to tsc
export type GSReducerType = [GameState, (a: GameStateAction) => void];

export function useGameState(): GSReducerType {
    const [inPlay, dispatch] = useReducer(reducer, new GameState())

    function reducer(state: GameState, action: GameStateAction): GameState {
        switch (action.type) {
            case 'selectPiece':
                return state.selectPiece(action.player, action.pieceName)
            case 'add':
                return state.playSelectedPiece(action.position)
            case 'reset':
                return new GameState();
            case 'passTurn':
                return state.passTurn();
            case 'rotateSelectedPiece':
                return state.rotateSelectedPiece(action.axis)
        }
    }

    return [inPlay, dispatch]
}
