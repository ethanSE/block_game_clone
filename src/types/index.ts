import { Vector3 } from "@react-three/fiber";
import { Piece, PieceName } from "../classes/Piece";
import { PlayerHand } from "../classes/PlayerHand";

export type PlayerID = 'p1' | 'p2';
export type Coord = Vector3;
export type InPlayPiece = { position: Coord, owner: PlayerID };
export type BaseTile = { position: [number, number] };
export type PlayerHands = Record<PlayerID, PlayerHand>
export type PiecesR = Readonly<Record<PieceName, Piece>>