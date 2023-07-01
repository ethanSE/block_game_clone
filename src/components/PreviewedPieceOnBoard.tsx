import { useContext } from "react"
import { GSReducerType } from "../hooks/useGameState"
import GameStateContext from "../context/GameStateContext"
import * as O from "fp-ts/Option"
import { Coord, PlayerID } from "../types"

export function PreviewedPieceOnBoard() {
    const [gameState, _]: GSReducerType = useContext(GameStateContext)
    const previewed = O.toNullable(gameState.getPreviewState())
    const currentPlayer = gameState.getCurrentPlayer()

    return (
        <group>
            {
                previewed?.cubes.map((p) => <PreviewCube
                    key={JSON.stringify(p)}
                    position={p.coords}
                    owner={currentPlayer}
                />)
            }
        </group>
    )
}

function PreviewCube(props: { position: Coord, owner: PlayerID }) {
    return (
        <mesh
            position={props.position}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={props.owner === 'p1' ? "#000080" : "#008000"} opacity={0.5} transparent={true} />
        </mesh>
    )
}