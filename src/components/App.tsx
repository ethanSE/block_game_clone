import { Canvas } from '@react-three/fiber'

//state/context
import GameStateContext from '../context/GameStateContext';
import { useGameState } from '../hooks/useGameState';

//components
import Board from './Board'
import CustomCamera from './CustomCamera'
import InPlayCubes from './InPlayCubes'

//styles
import './App.css';


function App() {
    //hold game state here
    const example = useGameState()

    return (
        <div className='website'>
            <GameStateContext.Provider value={example}>
                <Canvas>
                    <CustomCamera />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <InPlayCubes />
                    <Board />
                </Canvas>
            </GameStateContext.Provider>
        </div>
    );
}

export default App;