//Components
import CubeC from "../Cube";
import { BoardState } from "block-game-clone-backend/types/BoardState";
import { Cube } from "block-game-clone-backend/types/Cube";
import { Action } from "block-game-clone-backend/types/Action";
import { BoardCell } from "block-game-clone-backend/types/BoardCell";

const cells3DArrayTo1DPosition = (cells: BoardCell[][][]): Cube[] => {
    return cells.flatMap((a, x) => a.flatMap((b, y) => b.map((bc, z) => {
        return {
            position: [x, y, z] as [number, number, number],
            cell: bc
        }
    }))).filter((bc) => bc.cell.type === "Player").map((c): Cube => {
        return {
            position: c.position,
            error: null,
            player: c.cell.type === "Player" ? c.cell.data : "p1"
        }
    })
}

const CubesOnBoard = (props: { boardState: BoardState, update: (a: Action) => void }) => {
    const cubes = cells3DArrayTo1DPosition(props.boardState.board.cells);
    return (
        <>
            {cubes.map(
                (cube) =>
                    <CubeC cube={cube} update={props.update} key={cube.position.toString()} />
            )}
        </>
    );
}

export default CubesOnBoard;