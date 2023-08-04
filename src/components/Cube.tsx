import { p1Color, p2Color } from "../types";
import { RoundedBox } from "@react-three/drei";
import { Cube } from "block-game-clone-backend/types/Cube";
import { Action } from "block-game-clone-backend/types/Action";

const CubeC = (props: { cube: Cube, update: (a: Action) => void }) => {
    return (
        <RoundedBox
            args={[0.99, 0.99, 0.99]}
            castShadow={false}
            radius={0.05}
            smoothness={4}
            position={props.cube.position}
            onClick={(e) => {
                e.stopPropagation();
                props.update({ type: 'PreviewPiece', data: [props.cube.position[0], props.cube.position[1] + 1, props.cube.position[2]] });
            }}>
            <meshPhongMaterial color={props.cube.player === 'p1' ? p1Color : p2Color} />
        </RoundedBox>
    );
}

export default CubeC;