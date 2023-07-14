import { useMemo, useState } from 'react';
//styles
import '../styles/App.css';

import TwoPlayerLocal from './TwoPlayerLocal';
import TopBar from './TopBar';
import { Menu } from './menu/Menu';

export type Mode = 'menu' | 'solitaire' | 'twoPlayerLocal';

function App() {
    const [mode, setMode] = useState<Mode>('menu');

    const body = useMemo(() => {
        switch (mode) {
            case 'menu':
                return <Menu setMode={setMode} />
            case 'solitaire':
                return <Solitaire />
            case 'twoPlayerLocal':
                return <TwoPlayerLocal />
            default:
                return <TwoPlayerLocal />
        }
    }, [mode])

    return (
        <>
            <TopBar back={() => setMode('menu')} />
            {body}
        </>
    )
}

export default App;




function Solitaire(props: any) {
    return (<></>)
}