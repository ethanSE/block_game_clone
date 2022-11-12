export type Player = 'p1' | 'p2';
export type Coord = [number, number, number];
export type InPlayPiece = { position: Coord, owner: Player };
export type BaseTile = { position: [number, number] }
export type currentPlayer = 'p1' | 'p2';