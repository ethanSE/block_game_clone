import React from "react";
import { BaseTile } from "../../types";

export const BaseTiles = React.memo((props: { baseTiles: BaseTile[], onHover: (bt: BaseTile) => void, onClick: (bt: BaseTile) => void }) => {
    return (
        <>
            {
                props.baseTiles.map((item, index) =>
                    <BaseTileComponent
                        position={item.position}
                        key={index.toString()}
                        onHover={() => props.onHover(item)}
                        onClick={() => props.onClick(item)}
                    />)
            }
        </>
    )
}, (a, b) => true)


const BaseTileComponent = React.memo((props: { position: [number, number], onHover: () => void, onClick: () => void }) => {
    return (
        <mesh
            receiveShadow={false}
            castShadow={false}
            position={[props.position[0], -.6, props.position[1]]}
            onPointerOver={(event) => {
                event.stopPropagation();
                props.onHover()
            }}
            onClick={(event) => {
                event.stopPropagation();
                props.onClick()
            }}
        >
            <boxGeometry args={[1, .2, 1]} />
            <meshPhongMaterial color={"grey"} />
        </mesh>
    );
}, (a, b) => true);
