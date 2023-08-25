import { colors } from "../types";
import { RoundedBox } from "@react-three/drei";
import { Cube } from "block-game-clone-backend/types/Cube";
import { Action } from "block-game-clone-backend/types/Action";
import { useSpring, animated } from '@react-spring/three'

const CubeC = (props: { cube: Cube, update: (a: Action) => void, vsAI: boolean }) => {
    const delay = props.cube.player === "p2" && props.vsAI ? 500 : 0;
    const { yOffset } = useSpring({ yOffset: 0, from: { yOffset: 20 }, config: { mass: 1.5, friction: 30 }, delay });

    return (
        <animated.mesh
            position={yOffset.to(y => [0, y, 0])}
        >
            <RoundedBox
                args={[0.99, 0.99, 0.99]}
                position={props.cube.position}
                castShadow={false}
                radius={0.05}
                smoothness={4}
                onClick={(e) => {
                    e.stopPropagation();
                    props.update({ type: 'PreviewPiece', data: [props.cube.position[0], props.cube.position[1] + 1, props.cube.position[2]] });
                }}>
                <meshPhongMaterial color={colors[props.cube.player]} />
            </RoundedBox>
        </animated.mesh>
    );
}

export default CubeC;