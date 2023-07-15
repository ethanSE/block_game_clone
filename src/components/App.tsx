import { useState } from 'react';

import TopBar from './TopBar';
import { Menu } from './menu/Menu';
import Game from './Game';

import '../styles/App.css';

export type Mode = 'menu' | 'solitaire' | 'twoPlayerLocal';

function App() {
    const [mode, setMode] = useState<Mode>('menu');

    return (
        <>
            <TopBar back={() => setMode('menu')} />
            {mode === 'menu' ? <Menu setMode={setMode} /> : <Game mode={mode} />}
        </>
    )
}

export default App;