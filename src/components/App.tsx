import { useState } from 'react';

import TopBar from './TopBar';
import { Menu } from './menu/Menu';
import Game from './Game';

import css from '../styles/App.module.css';

export type Mode = 'menu' | 'solitaire' | 'twoPlayerLocal';

function App() {
    const [mode, setMode] = useState<Mode>('menu');

    return (
        <div className={css.app}>
            <TopBar back={() => setMode('menu')} />
            {mode === 'menu' ? <Menu setMode={setMode} /> : <Game mode={mode} />}
        </div>
    )
}

export default App;