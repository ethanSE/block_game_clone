import { PlayerHand } from '../types/PlayerHand';
import * as O from 'fp-ts/lib/Option'

test('piece selection', () => {
    const hand = new PlayerHand();
    expect(hand.getSelectedPiece()).toBe(O.none)

    const selected = hand.setSelectedPiece('piece1');
    expect(selected.getSelectedPiece()).toStrictEqual(O.some({ name: 'piece1', status: 'selected' }))

    const selected2 = selected.setSelectedPiece('piece4');
    expect(selected2.getSelectedPiece()).toStrictEqual(O.some({ name: 'piece4', status: 'selected' }))

    const cleared = selected2.clearSelectedPiece();
    expect(cleared.getSelectedPiece()).toBe(O.none)
});
