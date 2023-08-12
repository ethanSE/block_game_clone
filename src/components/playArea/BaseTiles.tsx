import { useMemo } from "react";
import { BoardState } from "block-game-clone-backend/types/BoardState";
import { BoardCell } from "block-game-clone-backend/types/BoardCell";
import { Action } from "block-game-clone-backend/types/Action";

import interpolate from "color-interpolate";
import { Wireframe } from "@react-three/drei";

export const BaseTiles = (props: { boardState: BoardState, update: (a: Action) => void }) => {
    // const baseTiles = useMemo(() => props.boardState.pieces.cells.flatMap((a, x) => a[0].map((b, z): [BoardCell["type"], [number, number]] => [b.type, [x, z]])).filter((i) => i[0] !== "OutOfBounds"), []);

    const tiles = props.boardState.pieces.height_limits.flatMap((rows, x) => rows.map((height, z): Tile => ({ position: [x, z], height: height })))

    type Tile = {
        position: [number, number],
        height: number
    }

    return (
        <>
            {
                tiles.map(({ position, height }) =>
                    <BaseTileComponent
                        position={position}
                        height={height}
                        key={position.toString()}
                        update={props.update}
                    />)
            }
        </>
    )
};


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
            <meshPhongMaterial color={color(props.height)} />
            <Wireframe simplify={true} stroke={"#000000"} thickness={0.001} />
        </mesh>
    );
};


const color = (n: number) => {
    const scale = interpolate(['#ffc371', '#ff5f6d']);
    let c = scale(n / 4);
    console.log(c)
    return c
}