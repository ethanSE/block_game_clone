import { Coord, Player } from "../hooks/useGameState";

export default function Cube(props: { position: Coord, owner: Player }) {
    return (
        <mesh
            position={props.position}
            onPointerOver={(event) => {
                event.stopPropagation();
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={props.owner === 'p1' ? "#000080" : "#008000"} />
        </mesh>
    );
}
