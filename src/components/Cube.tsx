import { useState } from "react";
import { coord } from "../hooks/useGameState";

export default function Cube(props: { position: coord }) {
    // Hold state for hovered and clicked events
    const [hovered, setHovered] = useState(false);

    return (
        <mesh
            position={props.position}
            onPointerOver={(event) => {
                event.stopPropagation();
                setHovered(true);
            }}
            onPointerOut={(_) => setHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
    );
}
