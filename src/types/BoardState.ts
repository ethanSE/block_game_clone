import { BaseTile, Coord, InPlayPiece, Player } from ".";

export class BoardState {
    //holds the state of the board
    //the board itself
    //the pieces in play and their owners
    constructor(playArea = fourByFive, pieces: InPlayPiece[] = []) {
        this.playArea = playArea;
        this.piecesInPlay = pieces;
    }

    playArea: BaseTile[];
    piecesInPlay: InPlayPiece[];

    getPlayArea(): BaseTile[] {
        return [...this.playArea]
    }

    getPieces(): InPlayPiece[] {
        return this.piecesInPlay;
    }

    addPiece(position: Coord, currentPlayer: Player): BoardState {
        //validation logic

        //separate methods for previewing a move and making a move

        //state for in-play vs preview, separate display logic, expand/rename InPlayPiece type

        //return new BoardState
        return new BoardState(this.playArea, [...this.piecesInPlay, { position: position, owner: currentPlayer }])
    }
}

const fourByFive: BaseTile[] = (new Array(20).fill(0)).map((_, index) => ({ position: [index % 5, Math.floor(index / 5)] }));