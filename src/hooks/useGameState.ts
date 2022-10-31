import { useReducer } from 'react';

export type gameStateAction = {
    type: 'reset'
} | {
    type: 'add',
    newPiece: coord
}
export type coord = [number, number, number]

export type GS = [coord[], (a: gameStateAction) => void];

export function useGameState(): GS {
    const [inPlay, dispatch] = useReducer(reducer, [])

    function reducer(state: coord[], action: gameStateAction) {
        switch (action.type) {
            case 'add':
                return [...state, action.newPiece]
            case 'reset':
                return [];
        }
    }

    return [inPlay, dispatch]
}

