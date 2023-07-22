import { View } from "@react-three/drei"
import { Vector3 } from "@react-three/fiber"
import { Suspense, useContext } from "react"
import GameStateContext from "../../context/GameStateContext"
import { GSReducerType } from "../../hooks/useGameState"
import PreviewedPiece from "./previewedPiece"
import { Gltf } from "@react-three/drei";
import { Euler } from "three"
import React from "react"
import { Lighting } from "../visual/Lighting"

const assetRotation1 = new Euler(Math.PI, 0, Math.PI / 2, 'XYZ')
const assetRotation2 = new Euler(0, Math.PI, 0, 'XYZ')

export default function PieceRotateArea(props: { pieceRotateDivRef: React.MutableRefObject<never> }) {
    const [_, dispatch]: GSReducerType = useContext(GameStateContext)

    const rotateX = () => dispatch({ type: 'rotateSelectedPiece', axis: 'X' })
    const rotateY = () => dispatch({ type: 'rotateSelectedPiece', axis: 'Y' })

    return (
        <View index={2} track={props.pieceRotateDivRef}>
            <Lighting />

            <RotateControl rotation={assetRotation1} rotate={rotateY} position={[0, 3, 0] as Vector3} />
            <RotateControl rotation={assetRotation2} rotate={rotateX} position={[3, 0, 0] as Vector3} />

            <PreviewedPiece />
        </View>
    )
}

function RotateControl(props: { rotate: () => void, rotation: Euler, position: Vector3 }) {
    return (
        <group
            onClick={(e) => { e.stopPropagation(); props.rotate() }}
            position={props.position}
            rotation={props.rotation}>
            <mesh visible={false}>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshStandardMaterial transparent={true} opacity={0.1} color={'green'} />
            </mesh>
            <Suspense >
                <Gltf
                    position={[-.5, 0, .5]}
                    src="arrow.glb"
                    scale={0.045}
                />
            </Suspense>
        </group >
    );
}