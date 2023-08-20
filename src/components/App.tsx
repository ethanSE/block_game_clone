import { useEffect, useState } from 'react';

import TopBar from './TopBar';
import { Menu } from './menu/Menu';
import Game from './Game';

import css from '../styles/App.module.css';
import { GameMode } from 'block-game-clone-backend/types/GameMode';
import Div100vh from 'react-div-100vh';

export type Mode = 'menu' | GameMode;

function App() {
    const [mode, setMode] = useState<Mode>('menu');

    useEffect(() => {
        document.body.style.overflow = "hidden";
    });

    return (
        <Div100vh>
            <div className={css.app}>
                <TopBar back={() => setMode('menu')} />
                {mode === 'menu' ? <Menu setMode={setMode} /> : <Game mode={mode} />}
            </div>
        </Div100vh>
    )
}

export default App;