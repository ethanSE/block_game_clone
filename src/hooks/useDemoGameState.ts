import { useEffect, useState } from "react";

import init, * as wasmModule from "block-game-clone-backend";
import { GameState } from "block-game-clone-backend/types/GameState"
import { Action } from "block-game-clone-backend/types/Action"
import { GameMode } from "block-game-clone-backend/types/GameMode";

export function useWasm() {
    const [wasm, setWasm] = useState<typeof import("block-game-clone-backend")>()

    useEffect(() => {
        const loadWasm = async () => {
            await init()
            setWasm(wasmModule)
        }
        loadWasm()
    }, [])

    return wasm
}

export function useDemoGameState(mode: GameMode) {
    const wasm = useWasm();
    const [state, setState] = useState<GameState>();

    useEffect(() => {
        console.log('firing')
        if (wasm) {
            let str = wasm.new_game(JSON.stringify(mode));
            let gs = JSON.parse(str) as GameState;
            setState(gs)
        }
    }, [wasm, mode])


    useEffect(() => {
        if (wasm && (state?.game_ended === false)) {
            console.log(state?.game_ended)
            let greedy_move_action: Action = { type: 'MakeGreedyAIMove' }
            let str = wasm.next_game_state(JSON.stringify(state), JSON.stringify(greedy_move_action));

            let gs = JSON.parse(str) as GameState;

            if (!gs.game_ended) {
                setTimeout(() => {
                    setState(gs);

                }, 500);
            }
        }
    }, [state, wasm])

    // const update = () => {
    //     if (wasm) {
    //         let greedy_move_action: Action = { type: 'MakeGreedyAIMove' }
    //         let str = wasm.next_game_state(JSON.stringify(state), JSON.stringify(greedy_move_action));
    //         let gs = JSON.parse(str) as GameState;
    //         setState(gs)
    //     }
    // }

    return { state }
}