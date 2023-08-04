import React from "react";
import { BoardState } from "block-game-clone-backend/types/BoardState";
import { Action } from "block-game-clone-backend/types/Action";

export const BaseTiles = (props: { boardState: BoardState, update: (a: Action) => void }) => {
    //TODO - probably incorrect x,y,z - > y is vertical?
    const indices = props.boardState.pieces.flatMap((a, x) => a.map((b, y) => [x, y] as [number, number]));

    return (
        <>
            {
                indices.map((index) =>
                    <BaseTileComponent
                        position={index}
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
            castShadow={false}
            position={[props.position[0], -.6, props.position[1]]}
            onClick={(event) => {
                event.stopPropagation();
                //TODO - fix indices
                props.update({ type: 'PreviewPiece', data: [props.position[0], 0, props.position[1]] })
            }}
        >
            <boxGeometry args={[1, .2, 1]} />
            <meshPhongMaterial color={"grey"} />
        </mesh>
    );
};
