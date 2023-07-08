import { Vector3 } from "three";
import { PlayerID, p1Color, p2Color } from "../types";
import { RoundedBox } from "@react-three/drei";
import React from "react";

export default React.memo((props: { position: Vector3, owner: PlayerID, addAbove: () => void, previewAbove: () => void }) => {
    return (
        <RoundedBox args={[0.99, 0.99, 0.99]}
            castShadow={false}
            radius={0.05}
            smoothness={4}
            position={props.position}
            onPointerOver={(event) => {
                event.stopPropagation();
                props.previewAbove();
            }}
            onClick={(e) => {
                e.stopPropagation();
                props.addAbove();
            }}>
            <meshPhongMaterial color={props.owner === 'p1' ? p1Color : p2Color} />
        </RoundedBox>
    );
}, (a, b) => true);
