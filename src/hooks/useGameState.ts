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

export function useGameState(mode: GameMode) {
    const wasm = useWasm();
    const [state, setState] = useState<GameState>();

    useEffect(() => {
        if (wasm) {
            let str = wasm.new_game(JSON.stringify(mode));
            let gs = JSON.parse(str) as GameState;
            setState(gs)
        }
    }, [wasm, mode])


    useEffect(() => {
        if (wasm && state?.game_mode.type === "VSGreedyAI" && state.player_state.current_player === "p2") {
            let greedy_move_action: Action = { type: 'MakeGreedyAIMove' }
            let str = wasm.next_game_state(JSON.stringify(state), JSON.stringify(greedy_move_action));
            let gs = JSON.parse(str) as GameState;
            setState(gs);
        }
    }, [state, wasm])

    const update = (action: Action) => {
        if (wasm) {
            let str = wasm.next_game_state(JSON.stringify(state), JSON.stringify(action));
            let gs = JSON.parse(str) as GameState;
            setState(gs)
        }
    }

    return { state, update }
}