import { useEffect, useState } from "react";

import init, * as wasmModule from "block-game-clone-backend";
import { GameState } from "block-game-clone-backend/types/GameState"
import { Action } from "block-game-clone-backend/types/Action"

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

export function useGameState() {
    const wasm = useWasm();
    const [state, setState] = useState<GameState>();

    useEffect(() => {
        if (wasm) {
            let s = wasm.new_two_player_four_by_five();
            let gs = JSON.parse(s);
            let gs2 = gs as GameState;
            setState(gs2)
        }
    }, [wasm])

    const update = (action: Action) => {
        if (wasm) {
            let s = wasm.next_game_state(JSON.stringify(state), JSON.stringify(action));
            let gs = JSON.parse(s) as GameState;

            setState(gs)
        }
    }

    return { state, update }
}