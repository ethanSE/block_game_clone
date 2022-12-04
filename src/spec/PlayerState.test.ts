import { PlayerState } from '../classes/PlayerState';
import * as O from 'fp-ts/lib/Option'

test('swap player on pass turn', () => {
    const playerState = new PlayerState();
    expect(playerState.getSelectedPieceName()).toBe(O.none);
    expect(playerState.getCurrentPlayer()).toBe('p1')
    expect(playerState.toggleCurrentPlayer().getCurrentPlayer()).toBe('p2')
})

test('piece is cleared on pass turn', () => {
    const playerState = new PlayerState();
    expect(playerState.getSelectedPieceName()).toBe(O.none);
    expect(playerState.getCurrentPlayer()).toBe('p1')
    const afterPieceSelect = playerState.selectPiece('L')
    const afterPassturn = afterPieceSelect.toggleCurrentPlayer()

    expect(afterPassturn.getCurrentPlayer()).toBe('p2')
    expect(afterPassturn.getSelectedPieceName()).toBe(O.none)
    expect(afterPassturn.selectPiece('T').toggleCurrentPlayer().getSelectedPieceName()).toBe(O.none)
})
