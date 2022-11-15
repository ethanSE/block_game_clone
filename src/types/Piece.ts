export type PieceName =
    'piece1'
    | 'piece2'
    | 'piece3'
    | 'piece4'
    | 'piece5'
    | 'piece6'
    | 'piece7'
    | 'piece8'
    | 'piece9'
    | 'piece10'
    | 'piece11'

export type PieceData = {
    status: Status
}

export type Piece = {
    name: PieceName
} & PieceData

export type Status = 'available' | 'selected' | 'unavailable';