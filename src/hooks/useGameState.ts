import { useReducer } from 'react';
import { GameState } from '../classes/GameState';
import { PieceName, RotationAxis } from '../classes/Piece';
import { Vector3 } from 'three';
import { Mode } from '../components/App';

export type GameStateAction =
    {
        type: 'reset'
    } | {
        type: 'add',
        position: Vector3
    } | {
        type: 'passTurn'
    } | {
        type: 'selectPiece',
        pieceName: PieceName
    } | {
        type: 'rotateSelectedPiece'
        axis: RotationAxis
    } | {
        type: 'previewPiece'
        position: Vector3
    } | {
        type: 'setSelectedPieceOrigin'
        newOrigin: Vector3
    }

//necessary to provide type hint to tsc
export type GSReducerType = [GameState, (a: GameStateAction) => void];

export function useGameState(mode: Mode): GSReducerType {
    const [gameState, dispatch] = useReducer(reducer, new GameState())

    function reducer(state: GameState, action: GameStateAction): GameState {
        switch (action.type) {
            case 'selectPiece':
                return state.selectPiece(action.pieceName)
            case 'add':
                return state.playPreviewedPiece()
            case 'reset':
                return new GameState();
            case 'passTurn':
                return state.passTurn();
            case 'rotateSelectedPiece':
                return state.rotateSelectedPiece(action.axis)
            case 'setSelectedPieceOrigin':
                return state.setSelectedPieceOrigin(action.newOrigin)
            case 'previewPiece':
                return state.previewPiece(action.position)
        }
    }

    return [gameState, dispatch]
}
