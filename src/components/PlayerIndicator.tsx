import { Player } from "block-game-clone-backend/types/Player";
import { colors } from "../types";

export default function PlayerIndicator(props: { player: Player, size: number }) {
    return (
        <div style={{ borderRadius: "3px", margin: "5px", width: `${props.size.toString()}px`, height: `${props.size.toString()}px`, backgroundColor: colors[props.player] }} />
    )
}