import { Wireframe } from "@react-three/drei";
import { BoardState } from "block-game-clone-backend/types/BoardState";
import { useContext } from "react";
import { BoxGeometry, Vector3 } from "three";
import { HeightIndicatorContext } from "../Game";

export default function BuildHeightLimitIndicators(props: { boardState: BoardState }) {
    const { showMaxHeightIndicators } = useContext(HeightIndicatorContext);
    let positions = props.boardState.pieces.height_limits.flatMap((zRow, x) => zRow.map((y, z) => new Vector3(x, y, z)));

    return (
        <>
            {showMaxHeightIndicators && positions.map((p) => <>
                <mesh position={[p.x, p.y - 0.4, p.z]}>
                    <Wireframe geometry={new BoxGeometry(1, 0.2, 1)} fillOpacity={0.1} stroke={"#f58742"} fill={0} thickness={.25} />
                </mesh>
            </>)}
        </>
    )
}