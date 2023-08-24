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
                <div style={{ flex: '1', display: 'flex', width: '100%' }}>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <button
                            onClick={() => props.setMode({ type: "TwoPlayer", data: { type: "Tower" } })}>
                            Two Player - Tower
                        </button>
                        <button
                            onClick={() => props.setMode({ type: "TwoPlayer", data: { type: "Pyramid" } })}>
                            Two Player - Pyramid
                        </button>
                        <button
                            onClick={() => props.setMode({ type: "TwoPlayer", data: { type: "Wall" } })}>
                            Two Player - Wall
                        </button>
                        <button
                            onClick={() => props.setMode({ type: "TwoPlayer", data: { type: "Stairs" } })}>
                            Two Player - Stairs
                        </button>
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <button
                            onClick={() => props.setMode({ type: "VSGreedyAI", data: { type: "Tower" } })}>
                            AI Player - Tower
                        </button>
                        <button
                            onClick={() => props.setMode({ type: "VSGreedyAI", data: { type: "Pyramid" } })}>
                            AI Player - Pyramid
                        </button>
                        <button
                            onClick={() => props.setMode({ type: "VSGreedyAI", data: { type: "Wall" } })}>
                            AI Player - Wall
                        </button>
                        <button
                            onClick={() => props.setMode({ type: "VSGreedyAI", data: { type: "Stairs" } })}>
                            AI Player - Stairs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}