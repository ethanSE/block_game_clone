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
