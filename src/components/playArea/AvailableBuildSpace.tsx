import { Wireframe } from "@react-three/drei";
import { BoardState } from "block-game-clone-backend/types/BoardState";
import { useContext } from "react";
import { BoxGeometry } from "three";
import { ShowAvailableSpaceContext } from "../Game";
import { heightColor } from "../../utils";

export default function AvailableBuildSpace(props: { boardState: BoardState }) {
    const { showAvailableSpace } = useContext(ShowAvailableSpaceContext);
    let positions = props.boardState.board.cells.flatMap((rows, x) => rows.flatMap((cols, y) => cols.map((cell, z) => ({ cell: cell, position: [x, y, z] as [number, number, number] }))));

    let empties = positions.filter(({ cell, position }) => cell.type === "Empty");

    return (
        <>
            {showAvailableSpace && empties.map(({ position }) => <>
                <mesh position={position} key={position.toString()}>
                    <Wireframe geometry={new BoxGeometry(1, 1, 1)} simplify={true} fill={heightColor(position[1])} stroke={"#000000"} thickness={.15} />
                </mesh>
            </>)}
        </>
    )
}

