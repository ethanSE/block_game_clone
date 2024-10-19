import GameBoard from "./GameBoard";
import { Lighting } from "../visual/Lighting";
import { GameState } from "block-game-clone-backend/types/GameState";
import { Action } from "block-game-clone-backend/types/Action";

export function PlayArea(props: {
    gameState: GameState,
    update: (a: Action) => void
}) {
    return (
        <>
            <Lighting />
            <GameBoard gameState={props.gameState} update={props.update} />
        </>
    )
}