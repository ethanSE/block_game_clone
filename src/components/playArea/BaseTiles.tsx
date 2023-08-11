import { useMemo } from "react";
import { BoardState } from "block-game-clone-backend/types/BoardState";
import { BoardCell } from "block-game-clone-backend/types/BoardCell";
import { Action } from "block-game-clone-backend/types/Action";

export const BaseTiles = (props: { boardState: BoardState, update: (a: Action) => void }) => {
    const baseTiles = useMemo(() => props.boardState.pieces.cells.flatMap((a, x) => a[0].map((b, z): [BoardCell["type"], [number, number]] => [b.type, [x, z]])).filter((i) => i[0] !== "OutOfBounds"), []);

    return (
        <>
            {
                baseTiles.map((index) =>
                    <BaseTileComponent
                        position={index[1]}
                        key={index.toString()}
                        update={props.update}
                    />)
            }
        </>
    )
};


const BaseTileComponent = (props: { position: [number, number], update: (a: Action) => void }) => {
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
            <meshPhongMaterial color={"grey"} />
        </mesh>
    );
};
