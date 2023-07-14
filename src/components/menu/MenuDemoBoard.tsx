import { BaseTile } from "../../types"
import { BaseTiles } from "../playArea/BaseTiles"

export const MenuDemoBaseTiles = () => {
    const tiles: BaseTile[] = new Array(9).fill(0).map((_, i) => ({ position: [i % 3, Math.floor(i / 3)] }))

    return (
        <>
            {tiles.map((tile) =>
                <BaseTiles key={JSON.stringify(tile.position)}
                    baseTiles={[{ position: [tile.position[0], tile.position[1]] }]} onClick={() => { }} onHover={() => { }} />
            )}
        </>
    )
}