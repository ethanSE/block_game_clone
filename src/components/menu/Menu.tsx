import { MenuDemo } from "./MenuDemo"
import css from '../../styles/Menu.module.css'
import { Mode } from "../App"

export const Menu = (props: { setMode: (m: Mode) => void }) => {
    return (
        <div className={css.menu}>
            <div className={css.menuDemoContainer}>
                <MenuDemo />
            </div>

            <div className={css.menuOptionsContainer}>
                <h3>Select game mode:</h3>
                <button
                    onClick={() => props.setMode({ type: "TwoPlayer", data: { type: "FourByFiveByFour" } })}>
                    Two Player Local - 4x5x4
                </button>
                <button
                    onClick={() => props.setMode({ type: "TwoPlayer", data: { type: "Pyramid" } })}>
                    Two Player Local - Pyramid
                </button>
            </div>
        </div>
    )
}