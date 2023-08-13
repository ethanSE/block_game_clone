import { Box, View } from "@react-three/drei"
import { Vector3 } from "@react-three/fiber"
import { Suspense } from "react"
import PreviewedPiece from "./previewedPiece"
import { Gltf } from "@react-three/drei";
import { Euler } from "three"
import React from "react"
import { Lighting } from "../visual/Lighting"
import { Action } from "block-game-clone-backend/types/Action";
import { PlayerState } from "block-game-clone-backend/types/PlayerState";

const assetRotation1 = new Euler(Math.PI, 0, Math.PI / 2, 'XYZ')
const assetRotation2 = new Euler(0, Math.PI, 0, 'XYZ')

export default function PieceRotateArea(props: { pieceRotateDivRef: React.MutableRefObject<never>, playerState: PlayerState, update: (a: Action) => void }) {
    const rotateX = () => props.update({ type: 'RotateSelectedPiece', data: 'X' })
    const rotateY = () => props.update({ type: 'RotateSelectedPiece', data: 'Y' })

    //TODO - rename - or - functional abstraction?
    const a = props.playerState.players[props.playerState.current_player];
    const piece = a.selected_piece && a.pieces[a.selected_piece]

    return (
        <View index={2} track={props.pieceRotateDivRef}>
            <Lighting />

            <RotateControl rotation={assetRotation1} rotate={rotateY} position={[0, 3, 0] as Vector3} />
            <RotateControl rotation={assetRotation2} rotate={rotateX} position={[3, 0, 0] as Vector3} />

            {piece && <PreviewedPiece piece={piece} update={props.update} owner={props.playerState.current_player} />}
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
                {/* <Box /> */}
            </Suspense>
        </group >
    );
}