import { Coord, PlayerID } from "../types";

export default function Piece(props: { position: Coord, owner: PlayerID }) {
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
