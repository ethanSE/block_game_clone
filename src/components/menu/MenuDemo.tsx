import { Canvas } from "@react-three/fiber"
import CustomCamera from "../visual/CustomCamera"
import { Lighting } from "../visual/Lighting"
import { BoardState } from "block-game-clone-backend/types/BoardState"
import { BaseTiles } from "../playArea/BaseTiles"
import CubesOnBoard from "../playArea/CubesOnBoard"
import { BoardCell } from "block-game-clone-backend/types/BoardCell"
import { Vector3 } from "three"
import { useDemoGameState } from "../../hooks/useDemoGameState"
import GameBoard from "../playArea/GameBoard"
import { Action } from "block-game-clone-backend/types/Action"
import { GameMode } from "block-game-clone-backend/types/GameMode"

export const MenuDemo = () => {
    return (
        <Canvas frameloop="always" style={{ cursor: "move" }}>
            <Lighting />
            <CustomCamera />
            <DemoAutoPlayAI />
        </Canvas>
    )
}

const _MenuDemoGameBoard = () => {
    const row1: BoardCell[][] = [[{ type: 'Player', data: 'p1' }, { type: 'Empty' }, { type: 'Empty' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }]]
    const row2: BoardCell[][] = [[{ type: 'Player', data: 'p1' }, { type: 'Player', data: 'p1' }, { type: 'Player', data: 'p2' }], [{ type: 'Empty' }, { type: 'Empty' }, { type: 'Empty' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }]]
    const row3: BoardCell[][] = [[{ type: 'Player', data: 'p1' }, { type: 'Player', data: 'p2' }, { type: 'Player', data: 'p2' }], [{ type: 'Empty' }, { type: 'Empty' }, { type: 'Player', data: 'p2' }], [{ type: 'Empty' }, { type: 'Player', data: 'p1' }, { type: 'Empty' }]]
    const demoBoardState: BoardState = { board: { cells: [row1, row2, row3], height_limits: [[3, 3, 3], [3, 3, 3], [3, 3, 3]], center: [1.0, 1.0, 1.0] }, previewed_piece: null };

    return (
        <group position={new Vector3(...demoBoardState.board.center).negate()}>
            <CubesOnBoard boardState={demoBoardState} update={(a) => { }} vsAI={false} />
            <BaseTiles boardState={demoBoardState} update={(a) => { }} />
        </group>
    )
}

const mode: GameMode = { type: "TwoPlayer", data: "Tower" };

const DemoAutoPlayAI = () => {

    const { state } = useDemoGameState(mode);

    return (
        <>
            {state &&
                <GameBoard gameState={state} update={(a: Action) => { }} />
            }
        </>
    )
}