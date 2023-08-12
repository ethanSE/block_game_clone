import { useEffect, useState } from "react";

import init, * as wasmModule from "block-game-clone-backend";
import { GameState } from "block-game-clone-backend/types/GameState"
import { Action } from "block-game-clone-backend/types/Action"
import { Mode } from "../components/App";

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

export function useGameState(mode: Mode) {
    const wasm = useWasm();
    const [state, setState] = useState<GameState>();

    useEffect(() => {
        if (wasm) {
            console.log("mode in useGameState", mode)
            let str = mode === "2pPyramid" ? wasm.new_two_player_pyramid() : wasm.new_two_player_four_by_five();
            let gs = JSON.parse(str) as GameState;
            setState(gs)
        }
    }, [wasm, mode])

    const update = (action: Action) => {
        if (wasm) {
            let str = wasm.next_game_state(JSON.stringify(state), JSON.stringify(action));
            let gs = JSON.parse(str) as GameState;
            setState(gs)
        }
    }

    return { state, update }
}