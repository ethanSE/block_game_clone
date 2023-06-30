import { BaseTile, Coord, InPlayPiece, PlayerID } from "../types";
import * as O from 'fp-ts/lib/Option'
import { Piece } from "./Piece";

export class BoardState {
    constructor(playArea = defaultBoard, pieces: InPlayPiece[] = [], previewedPiece: O.Option<Piece> = O.none) {
        this.playArea = playArea;
        this.piecesInPlay = pieces;
        this.previewedPiece = previewedPiece
    };

    private readonly playArea: BaseTile[];
    private readonly piecesInPlay: InPlayPiece[];
    private readonly previewedPiece: O.Option<Piece>;

    getPlayArea(): BaseTile[] {
        return [...this.playArea]
    }

    getPieces(): InPlayPiece[] {
        return this.piecesInPlay;
    }

    getPreviewedPiece(): O.Option<Piece> {
        return this.previewedPiece;
    }

    previewPiece(position: Coord, selectedPiece: Piece, currentPlayer: PlayerID): BoardState {
        let translated = selectedPiece.move(position);
        return new BoardState(this.playArea, this.piecesInPlay, O.of(translated))
    }

    addPiece(position: Coord, currentPlayer: PlayerID): BoardState {
        //will perform validation logic
        //or delegate this work to other method
        //combine with move preview logic?

        return new BoardState(this.playArea, [...this.piecesInPlay, { position: position, owner: currentPlayer }])
    }
}

const defaultBoard: BaseTile[] = (new Array(20).fill(0)).map((_, index) => ({ position: [index % 5, Math.floor(index / 5)] }));