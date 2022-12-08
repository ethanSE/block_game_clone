import { useContext } from "react";

//State/Context
import GameStateContext from "../context/GameStateContext";
import { GSReducerType } from "../hooks/useGameState";

//Components
import Piece from "./Piece";

export default function InPlayPieces() {
    const [gameState]: GSReducerType = useContext(GameStateContext)
    return (
        <group>
            {gameState.getPieces().map(
                (piece) =>
                    <Piece
                        key={JSON.stringify(piece.position)}
                        position={piece.position}
                        owner={piece.owner}
                    />
            )}
        </group>
    );
}
