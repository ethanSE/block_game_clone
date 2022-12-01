import { Canvas, useThree } from '@react-three/fiber'
import { Hud } from '@react-three/drei'
import GamerBoard from './GameBoard';

//components
import GameBoard from './GameBoard'
import CustomCamera from './CustomCamera'
import PreviewedPiece from './previewedPiece';


function MainGameArea() {
    return (
        <div style={{ flex: 1 }}>
            <Canvas>
                <CustomCamera />
                <ambientLight intensity={0.5} />
                <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <GameBoard />
                <Hud>
                    <PreviewedPiece />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                </Hud>
            </Canvas>
        </div>
    );
}

export default MainGameArea;