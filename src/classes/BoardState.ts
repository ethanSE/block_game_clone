import { BaseTile, Coord, InPlayPiece, PlayerID } from "../types";
import * as E from 'fp-ts/lib/Either'

export class BoardState {
    constructor(playArea = fourByFive, pieces: InPlayPiece[] = []) {
        this.playArea = playArea;
        this.piecesInPlay = pieces;
    };

    private readonly playArea: BaseTile[];
    private readonly piecesInPlay: InPlayPiece[];

    getPlayArea(): BaseTile[] {
        return [...this.playArea]
    }

    getPieces(): InPlayPiece[] {
        return this.piecesInPlay;
    }

    addPiece(position: Coord, currentPlayer: PlayerID): E.Either<BoardState, BoardState> {
        //will perform validation logic
        //or delegate this work to other method
        //combine with move preview logic?

        return E.right(new BoardState(this.playArea, [...this.piecesInPlay, { position: position, owner: currentPlayer }]))
    }
}

const fourByFive: BaseTile[] = (new Array(20).fill(0)).map((_, index) => ({ position: [index % 5, Math.floor(index / 5)] }));