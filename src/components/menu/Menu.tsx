import { MenuDemo } from "./MenuDemo"
import css from '../../styles/Menu.module.css'
import { Mode } from "../App"
import { TwoPlayerMap } from "block-game-clone-backend/types/TwoPlayerMap"

export const Menu = (props: { setMode: (m: Mode) => void }) => {
    return (
        <div className={css.menu}>
            <MenuDemo />
            <div className={css.menuOptionsContainer}>
                <h3>Select game mode:</h3>
                <div style={{ flex: '1', display: 'flex', width: '100%' }}>
                    <MapModeSelector setMode={props.setMode} gameMode={"VSGreedyAI"} />
                    <MapModeSelector setMode={props.setMode} gameMode={"TwoPlayer"} />
                </div>
            </div>
        </div>
    )
};

function MapModeSelector(props: { setMode: (m: Mode) => void, gameMode: "VSGreedyAI" | "TwoPlayer" }) {
    let maps: TwoPlayerMap[] = ["Tower", "Pyramid", "Wall", "Stairs"];
    return (
        <div className={css.mapSelector}>
            <h3>{props.gameMode}</h3>
            {maps.map((map) =>
                <button
                    className={css.button}
                    onClick={() => props.setMode({ type: props.gameMode, data: map })}
                >
                    {map}
                </button>
            )}
        </div>
    )
}