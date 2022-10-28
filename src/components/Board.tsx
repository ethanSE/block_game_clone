import { ContactShadows } from '@react-three/drei';

//Components
import { BoardSquare } from './BoardSquare';

//temporary - extract to game state higher in component structure
//will be multiple boards later, differennt shapes, max heights, etc.
const defaultBoard = new Array(20).fill(0);

export default function Board() {
    return (
        <mesh>
            {defaultBoard.map((_, index) =>
                <BoardSquare position={[index % 5, Math.floor(index / 5)]} key={index.toString()} />)}
            <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </mesh>
    );
}
