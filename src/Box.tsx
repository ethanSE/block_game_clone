import { useState } from "react";

export default function Box(props: JSX.IntrinsicElements["mesh"]) {
    // Hold state for hovered and clicked events
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    return (
        <mesh
            {...props}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => {
                event.stopPropagation();
                setClicked(!clicked);
            }}
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
