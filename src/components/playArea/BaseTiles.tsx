import { BoardState } from "block-game-clone-backend/types/BoardState";
import { Action } from "block-game-clone-backend/types/Action";
import { Wireframe } from "@react-three/drei";
import { useShadows } from "../visual/Shadows";
import { heightColor } from "../../utils";

export const BaseTiles = (props: { boardState: BoardState, update: (a: Action) => void }) => {

    const tiles = props.boardState.board.height_limits.flatMap((rows, x) => rows.map((height, z): Tile => ({ position: [x, z], height: height }))).filter((tile) => tile.height > 0)
    const { groupRef, CalculatedShadows } = useShadows(.5);

    return (
        <>
            <group ref={groupRef}>
                {
                    tiles.map(({ position, height }) =>
                        <BaseTileComponent
                            position={position}
                            height={height}
                            key={position.toString()}
                            update={props.update}
                        />)
                }
            </group>
            <CalculatedShadows />
        </>
    )
}

type Tile = {
    position: [number, number],
    height: number
}

const BaseTileComponent = (props: { position: [number, number], height: number, update: (a: Action) => void }) => {
    return (
        <mesh
            receiveShadow={false}
            castShadow={true}
            position={[props.position[0], -.6, props.position[1]]}
            onClick={(event) => {
                event.stopPropagation();
                props.update({ type: 'PreviewPiece', data: [props.position[0], 0, props.position[1]] })
            }}
        >
            <boxGeometry args={[1, .2, 1]} />
            <meshPhongMaterial color={heightColor(props.height)} />
            <Wireframe simplify={true} stroke={"#000000"} thickness={0.001} />
        </mesh>
    );
};