import { ContactShadows } from "@react-three/drei";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Box3, Vector3 } from "three";

type ShadowProps = {
    position: Vector3 | null | undefined,
    scale: number | null | undefined
}

export const Shadows = React.memo((props: ShadowProps) => {
    return (<>
        {
            props.position && props.scale &&
            <ContactShadows position={props.position} opacity={0.75} scale={props.scale} blur={2.5} far={4} frames={1} />
        }
    </>
    )
}, (a, b) => true);

export const useShadows = (distance_below: number) => {
    const groupRef = useRef(null!);
    const [shadowProps, setShadowProps] = useState<ShadowProps>({ position: undefined, scale: undefined });

    // Get bounds
    useLayoutEffect(() => {
        if (groupRef.current) {
            const bounds = new Box3().setFromObject(groupRef.current);
            let scale = bounds.min.distanceTo(bounds.max);
            let shadow_position = new Vector3();
            bounds.getCenter(shadow_position);
            shadow_position.sub(new Vector3(0, distance_below, 0));
            setShadowProps({ position: shadow_position, scale: scale });
        }
    }, [distance_below]);

    const CalculatedShadows = useCallback(() => { return (<Shadows {...shadowProps} />) }, [shadowProps]);

    return { groupRef, CalculatedShadows }
}