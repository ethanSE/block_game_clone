//Components
import CubeC from "../Cube";
import { BoardState } from "block-game-clone-backend/types/BoardState";
import { Cube } from "block-game-clone-backend/types/Cube";
import { Action } from "block-game-clone-backend/types/Action";
import { BoardCell } from "block-game-clone-backend/types/BoardCell";

const CubesOnBoard = (props: { boardState: BoardState, update: (a: Action) => void }) => {

    //TODO - clean up? - functional abstraction(?) - memoize(?)

    let cubes = props.boardState.board.cells.flatMap((a, x) => a.flatMap((b, y) => b.map((bc, z) => {
        let cube: { position: [number, number, number], cell: BoardCell } = {
            position: [x, y, z],
            cell: bc
        }
        return cube
    }))).filter((bc) => bc.cell.type === "Player").map((c) => {
        let a: Cube = {
            position: c.position,
            error: null,
            player: c.cell.type === "Player" ? c.cell.data : "p1"
        }
        return a;
    });

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