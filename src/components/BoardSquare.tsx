export function BoardSquare(props: { position: [number, number], preview: () => void, add: () => void }) {
    return (
        <mesh
            receiveShadow={false}
            castShadow={false}
            position={[props.position[0], -.6, props.position[1]]}
            onPointerOver={(event) => {
                event.stopPropagation();
                props.preview()
            }}
            onClick={(event) => {
                event.stopPropagation();
                props.add()
            }}
        >
            <boxGeometry args={[1, .2, 1]} />
            <meshPhongMaterial color={"grey"} />
        </mesh>
    );
}
