import { useReducer } from 'react';
import { Coord, PlayerID } from '../types';
import { GameState } from '../classes/GameState';
import { PieceName } from '../classes/Piece';
import { RotationDirection } from '../classes/SelectedPiece';

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
    } | {
        type: 'rotateSelectedPiece'
        rotation: RotationDirection
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
                return state.passTurn();
            case 'rotateSelectedPiece':
                return state.rotateSelectedPiece(action.rotation)
        }
    }

    return [inPlay, dispatch]
}
