//This is only for development. It is used to create piece images for selecting a piece to play in the ui.
//renders the pieces on a canvas and exports images as png.
//import this component in Game and click on images to download.

//allows for updating ui assets to be consistent with the rest of the project's design language (colors, wireframe, etc.)

import { Center, Box, Wireframe } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Piece } from "block-game-clone-backend/types/Piece";
import { PieceName } from "block-game-clone-backend/types/PieceName";
import { BoxGeometry } from "three";
import { Lighting } from "./visual/Lighting";
import { GameState } from "block-game-clone-backend/types/GameState";


import css from "../styles/PieceImageDownloader.module.css"

export const PieceImageDownloader = (props: { gameState: GameState }) => {

    const current_player = props.gameState.player_state.current_player;
    const current_player_hand = props.gameState.player_state.players[current_player];
    const pieces = Object.entries(current_player_hand.pieces) as [PieceName, Piece][];

    return (
        <div className={css.pieceGroup} >
            {
                pieces.map(([pieceName, piece]) =>
                    <div style={{ width: "100px", height: "100px", pointerEvents: "all" }}>
                        <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [10, 20, -10], zoom: 10 }} frameloop="always">
                            <Lighting />
                            <PieceImageDownloaderItem piece={piece} pieceName={pieceName} />
                        </Canvas>
                    </div>
                )
            }
        </div >
    )

}

const PieceImageDownloaderItem = (props: { piece: Piece, pieceName: PieceName }) => {
    const { gl } = useThree();

    function download(uri: string, name: string) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Center onClick={(e) => { e.stopPropagation(); download(gl.domElement.toDataURL("image/png"), props.pieceName) }}>
            {props.piece.coords.map((position) =>
                <Box
                    position={position}
                >
                    <meshPhongMaterial color={"tan"} />
                    <Wireframe geometry={new BoxGeometry(1, 1, 1)} simplify={true} fillOpacity={0} stroke={"#000000"} thickness={0.15} />
                </Box>
            )}
        </Center>
    )
}




