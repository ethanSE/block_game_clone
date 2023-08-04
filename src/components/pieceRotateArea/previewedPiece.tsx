//Components
import { p1Color, p2Color } from "../../types";
import { Center, Edges, RoundedBox } from "@react-three/drei";
import { Action } from "block-game-clone-backend/types/Action";
import { Cube } from "block-game-clone-backend/types/Cube";
import { Piece } from "block-game-clone-backend/types/Piece";
import { Player } from "block-game-clone-backend/types/Player";

export default function PreviewedPiece(props: { piece: Piece, owner: Player, update: (a: Action) => void }) {

    return (
        <Center
            onCentered={() => { }}
        >
            {props.piece.coords.map((coord) => <PreviewCube
                key={JSON.stringify(coord)}
                cube={{ player: props.owner, position: coord, error: null }}
                //TODO - improve
                selected={coord[0] === 0 && coord[1] === 0 && coord[2] === 0}
                setSelectedPieceOrigin={() => props.update({ type: 'SetSelectedPieceOrigin', data: coord })}
            />)}
        </Center >
    );
}

function PreviewCube(props: { cube: Cube, selected: boolean, setSelectedPieceOrigin: () => void }) {
    return (
        <>
            <RoundedBox
                args={[0.99, 0.99, 0.99]}
                radius={0.05}
                smoothness={4}
                position={props.cube.position}
                onClick={(e) => {
                    e.stopPropagation();
                    props.setSelectedPieceOrigin();
                }}>
                <meshPhongMaterial color={props.cube.player === 'p1' ? p1Color : p2Color} />
            </RoundedBox>
            {props.selected && <HighLightSelected />}
        </>
    );
}

function HighLightSelected() {
    return <mesh>
        <Edges
            scale={1}
            color={"black"}
        />
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial visible={false} />
    </mesh>
}