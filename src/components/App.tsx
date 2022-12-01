//state/context
import GameStateContext from '../context/GameStateContext';
import { useGameState } from '../hooks/useGameState';

//components
import PieceSelectorContainer from './PieceSelector';

//styles
import '../styles/App.css';
import MainGameArea from './MainGameArea';
import { PiecePreviewContainer } from './PiecePreviewContainer';
import { OrthographicCamera } from '@react-three/drei';
import { useRef } from 'react';
import PreviewedPiece from './previewedPiece';

function App() {
    const gameState = useGameState()

    return (
        <div className='website'>
            <GameStateContext.Provider value={gameState}>
                <MainGameArea />
                <PieceSelectorContainer />
            </GameStateContext.Provider>
        </div>
    );
}

export default App;