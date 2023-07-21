import { Center } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import CustomCamera from "../visual/CustomCamera"

import { MenuDemoPieces } from "./MenuDemoPieces"
import { Lighting } from "../visual/Lighting"
import { MenuDemoBaseTiles } from "./MenuDemoBoard"

export const MenuDemo = () => {
    return (
        <Canvas frameloop="demand" style={{ cursor: "move" }}>
            <Lighting />
            <CustomCamera />

            <MenuDemoGameBoard />
        </Canvas>
    )
}


const MenuDemoGameBoard = () => {
    return (
        <Center>
            <MenuDemoBaseTiles />
            <MenuDemoPieces />
        </Center>
    )
}