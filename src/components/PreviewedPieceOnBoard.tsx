import { useContext } from "react"
import { GSReducerType } from "../hooks/useGameState"
import GameStateContext from "../context/GameStateContext"
import * as O from "fp-ts/Option"
import { PlayerID, PreviewCubeError, p1Color, p2Color } from "../types"
import { Vector3 } from "three"

export function PreviewedPieceOnBoard() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    const previewed = gameState.getPreviewCubes()
    const currentPlayer = gameState.getCurrentPlayer()

    return (
        <group>
            {
                previewed.map((p) => <PreviewCube
                    key={JSON.stringify(p)}
                    position={p.position}
                    error={p.error}
                    owner={currentPlayer}
                />)
            }
        </group>
    )
}

function PreviewCube(props: { position: Vector3, owner: PlayerID, error: O.Option<PreviewCubeError> }) {
    const color = O.isNone(props.error) ? props.owner === 'p1' ? p1Color : p2Color : "red"
    return (
        <mesh
            position={props.position}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} opacity={0.5} transparent={true} />
        </mesh>
    )
}