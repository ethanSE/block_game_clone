import { useContext } from 'react'
import { Vector3 } from 'three';
//state/context
import GameStateContext from '../context/GameStateContext';

export function BoardSquare(props: { position: [number, number] }) {
    const [_, dispatch] = useContext(GameStateContext);
    return (
        <mesh
            receiveShadow={false}
            castShadow={false}
            position={[props.position[0], -.6, props.position[1]]}
            onPointerOver={(event) => {
                event.stopPropagation();
                dispatch({
                    type: 'previewPiece',
                    position: new Vector3(props.position[0], 0, props.position[1])
                })
            }}
            onClick={(event) => {
                event.stopPropagation();
                if (props.position) {
                    dispatch({
                        type: "add",
                        position: new Vector3(props.position[0], 0, props.position[1])
                    })
                }
            }}
        >
            <boxGeometry args={[1, .2, 1]} />
            <meshPhongMaterial color={"grey"} />
        </mesh>
    );
}
