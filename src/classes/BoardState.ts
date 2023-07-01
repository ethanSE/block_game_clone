import { BaseTile, Coord, InPlayPiece, PlayerID } from "../types";
import * as O from 'fp-ts/lib/Option'
import { Piece } from "./Piece";
import { MovePreview, PreviewCube, Validity } from "./MovePreview";

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

    validatePlacement(currentPlayer: PlayerID, piece: Piece, position: Coord): MovePreview {
        function alwaysValid(coord: Coord): PreviewCube {
            return { 'validity': Validity.Valid, coords: coord }
        }

        function translate(c: Coord): Coord {
            return c.clone().add(position).round()
        }
        //TODO! Implement validation logic
        return { 'cubes': piece.getCoords().map(translate).map(alwaysValid), 'isValid': true }
    }

    addPieces(positions: Coord[], currentPlayer: PlayerID): BoardState {
        //will perform validation logic
        //or delegate this work to other method
        //combine with move preview logic?

        let withOwner = positions.map(p => ({ position: p, owner: currentPlayer }))

        return new BoardState(this.playArea, [...this.piecesInPlay, ...withOwner])
    }
}

const defaultBoard: BaseTile[] = (new Array(20).fill(0)).map((_, index) => ({ position: [index % 5, Math.floor(index / 5)] }));