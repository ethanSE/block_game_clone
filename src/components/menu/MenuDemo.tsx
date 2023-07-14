import { AccumulativeShadows, Center, ContactShadows, RandomizedLight } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import CustomCamera from "../visual/CustomCamera"

import { MenuDemoPieces } from "./MenuDemoPieces"
import { Lighting } from "../visual/Lighting"
import { Shadows } from "../visual/Shadows"
import { MenuDemoBaseTiles } from "./MenuDemoBoard"

export const MenuDemo = () => {
    return (
        <Canvas eventSource={document.getElementById('root')!} style={{ pointerEvents: 'none' }} frameloop="demand">
            <Lighting />
            <CustomCamera />

            <MenuDemoGameBoard />
        </Canvas>
    )
}


const MenuDemoGameBoard = () => {
    return (
        <Center >


            < MenuDemoBaseTiles />
            <MenuDemoPieces />


        </Center>
    )
}