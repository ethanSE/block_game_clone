import { useState, useContext } from 'react'
//state/context
import GameStateContext from '../context/GameStateContext';

export function BoardSquare(props: { position: [number, number] }) {
    const [hovered, setHovered] = useState(false);
    const [_, dispatch] = useContext(GameStateContext);
    return (
        <mesh
            position={[props.position[0], -.6, props.position[1]]}
            onPointerOver={(event) => {
                event.stopPropagation();
                setHovered(true);
            }}
            onPointerOut={(_) => setHovered(false)}
            onClick={(event) => {
                event.stopPropagation();
                console.log(props.position);
                if (props.position) {
                    dispatch({
                        type: "add",
                        newPiece: [props.position[0], 0, props.position[1]]
                    })
                }
            }
            }
        >
            <boxGeometry args={[1, .2, 1]} />
            <meshStandardMaterial color={hovered ? "teal" : "grey"} />
        </mesh>
    );
}
