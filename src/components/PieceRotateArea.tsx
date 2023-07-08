import { View, Box } from "@react-three/drei"
import { Vector3 } from "@react-three/fiber"
import { useContext } from "react"
import GameStateContext from "../context/GameStateContext"
import { GSReducerType } from "../hooks/useGameState"
import PreviewedPiece from "./previewedPiece"
import RotateControlNew from './RotateControlNew'
import { Model } from "./Scene"


export default function PieceRotateArea(props: { pieceRotateDivRef: React.MutableRefObject<never> }) {
    const [_, dispatch]: GSReducerType = useContext(GameStateContext)

    const rotateX = () => dispatch({ type: 'rotateSelectedPiece', axis: 'X' })
    const rotateY = () => dispatch({ type: 'rotateSelectedPiece', axis: 'Y' })

    return (
        <View index={2} track={props.pieceRotateDivRef}>
            <RotateControl rotate={rotateX} position={[3, 0, 0] as Vector3} />
            <RotateControl rotate={rotateY} position={[0, 3, 0] as Vector3} />

            {/* <RotateControlNew rotate={rotateY} position={[0, 3, 1] as Vector3} /> */}

            <ambientLight intensity={0.5} />
            <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <PreviewedPiece />
        </View>
    )
}

function RotateControl(props: { rotate: () => void, position: Vector3 }) {
    return (
        <Box
            onClick={props.rotate}
            position={props.position}
            matrixWorldAutoUpdate={undefined}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}>
            <meshBasicMaterial color="orange" />
        </Box>
    )
}