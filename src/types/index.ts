export type PlayerID = 'p1' | 'p2';
export type Coord = readonly [number, number, number];
export type InPlayPiece = { position: Coord, owner: PlayerID };
export type BaseTile = { position: [number, number] };