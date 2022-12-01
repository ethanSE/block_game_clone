import { PlayerHand } from '../classes/PlayerHand';
import * as O from 'fp-ts/lib/Option'

test('piece selection', () => {
    const hand = new PlayerHand();
    expect(hand.getSelectedPieceName()).toBe(O.none)

    const selected = hand.setSelectedPiece('1x2');
    expect(selected.getSelectedPieceName()).toStrictEqual(O.some({ name: '1x2', status: 'selected' }))

    const selected2 = selected.setSelectedPiece('otherOne');
    expect(selected2.getSelectedPieceName()).toStrictEqual(O.some({ name: 'otherOne', status: 'selected' }))

    const cleared = selected2.clearSelectedPiece();
    expect(cleared.getSelectedPieceName()).toBe(O.none)
});
