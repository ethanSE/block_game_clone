import { ContactShadows } from "@react-three/drei";
import React from "react";

export const Shadows = React.memo(() => {
    return <ContactShadows position={[0, -1, 0]} opacity={0.75} scale={10} blur={2.5} far={4} frames={1} />
}, (a, b) => true);