import { Center } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import CustomCamera from "../visual/CustomCamera"
import { Lighting } from "../visual/Lighting"

import { BoardState } from "block-game-clone-backend/types/BoardState"
import { BaseTiles } from "../playArea/BaseTiles"
import CubesOnBoard from "../playArea/CubesOnBoard"
import { BoardCell } from "block-game-clone-backend/types/BoardCell"

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
    const row1: BoardCell[][] = [[{ type: 'Player', data: 'p1' }, { type: 'Empty' }, { type: 'Empty' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }]]
    const row2: BoardCell[][] = [[{ type: 'Player', data: 'p1' }, { type: 'Player', data: 'p1' }, { type: 'Player', data: 'p2' }], [{ type: 'Empty' }, { type: 'Empty' }, { type: 'Empty' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }]]
    const row3: BoardCell[][] = [[{ type: 'Player', data: 'p1' }, { type: 'Player', data: 'p2' }, { type: 'Player', data: 'p2' }], [{ type: 'Empty' }, { type: 'Empty' }, { type: 'Player', data: 'p2' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }]]
    const demoBoardState: BoardState = { pieces: [row1, row2, row3], previewed_piece: null };

    return (
        <Center>
            <CubesOnBoard boardState={demoBoardState} update={(a) => { }} />
            <BaseTiles boardState={demoBoardState} update={(a) => { }} />
        </Center>
    )
}