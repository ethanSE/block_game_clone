import { colors } from "../types"
import { Cube } from "block-game-clone-backend/types/Cube"
import { GameState } from "block-game-clone-backend/types/GameState"

export function PreviewedPieceOnBoard(props: { gameState: GameState }) {
    const previewed = props.gameState.board_state.previewed_piece

    return (
        <group
            castShadow={false}
            receiveShadow={false}>
            {
                previewed?.map((c) => <PreviewCube
                    key={JSON.stringify(c)}
                    cube={c}
                />)
            }
        </group>
    )
}

function PreviewCube(props: { cube: Cube }) {
    const color = props.cube.error ? "red" : colors[props.cube.player]
    return (
        <mesh
            castShadow={false}
            position={props.cube.position}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} opacity={0.5} transparent={true} />
        </mesh>
    )
}