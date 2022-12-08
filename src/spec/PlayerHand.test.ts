import { PlayerHand } from '../classes/PlayerHand';
import * as O from 'fp-ts/lib/Option'

test('piece is selected', () => {
    const testPieceName = 'L'
    const hand = PlayerHand.new();
    const afterSelection = hand.setSelectedPiece(testPieceName);

    expect(afterSelection.getSelectedPieceName()).toStrictEqual(O.some(testPieceName))
})

test('piece is selected and cleared', () => {
    const testPieceName = 'L'
    const hand = PlayerHand.new();
    const afterSelection = hand.setSelectedPiece(testPieceName);

    expect(afterSelection.getSelectedPieceName()).toStrictEqual(O.some(testPieceName))

    const afterClearPiece = afterSelection.clearSelectedPiece().getSelectedPieceName()
    expect(afterClearPiece).toStrictEqual(O.none)
})

test('piece is cleared on play', () => {
    const testPieceName = 'L'
    const hand = PlayerHand.new();
    const afterSelection = hand.setSelectedPiece(testPieceName);

    const selectedPiece = afterSelection.getSelectedPieceName();
    expect(selectedPiece).toStrictEqual(O.some(testPieceName))

    const selectedPieceAfterPlay = afterSelection.playSelectedPiece().getSelectedPieceName()
    expect(selectedPieceAfterPlay).toStrictEqual(O.none)
})

test('cannot re-select piece after it is played', () => {
    const testPieceName = 'L'
    const hand = PlayerHand.new();

    const afterPlayAndReselect =
        hand.setSelectedPiece(testPieceName)
            .playSelectedPiece()
            .setSelectedPiece(testPieceName)

    expect(afterPlayAndReselect.getSelectedPieceName()).toStrictEqual(O.none)
})

test('piece orientation is maintained when switching pieces', () => {
    // a piece should stay in the same position when selected, unselected, and reselected
    const hand = PlayerHand.new();
    const intialSelectionAndRotation = hand.setSelectedPiece('T').rotateSelectedPiece('X')
    const initialPiecePosition = intialSelectionAndRotation.getSelectedPieceCoords()

    // position should be preserved when deleselecting and reselecting a piece
    expect(
        intialSelectionAndRotation
            .clearSelectedPiece()
            .setSelectedPiece('T')
            .getSelectedPieceCoords()
    ).toStrictEqual(initialPiecePosition)

    //pieces are rotated independently
    expect(
        intialSelectionAndRotation
            .setSelectedPiece('L')
            .rotateSelectedPiece('Y')
            .setSelectedPiece('T')
            .getSelectedPieceCoords()
    ).toStrictEqual(initialPiecePosition)
})
