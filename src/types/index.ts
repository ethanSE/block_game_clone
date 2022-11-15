import { PieceData, PieceName } from "./Piece";
import { PlayerHand } from "./PlayerHand";

export type PlayerID = 'p1' | 'p2';
export type Coord = readonly [number, number, number];
export type InPlayPiece = { position: Coord, owner: PlayerID };
export type BaseTile = { position: [number, number] };
export type PlayerHands = Record<PlayerID, PlayerHand>
export type PiecesR = Readonly<Record<PieceName, PieceData>>