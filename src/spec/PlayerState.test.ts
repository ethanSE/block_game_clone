import { PlayerState } from '../types/PlayerState';
import * as O from 'fp-ts/lib/Option'

test('Player State', () => {
    const playerState = new PlayerState();
    expect(playerState.getSelectedPiece()).toBe(O.none);
    expect(playerState.getCurrentPlayer()).toBe('p1')

    const afterSelection = playerState.selectPiece('piece4');
    expect(afterSelection.getSelectedPiece()).toStrictEqual(O.some({ name: 'piece4', status: 'selected' }))

    const afterPlay = afterSelection.playSelectedPiece();
    expect(afterPlay.getSelectedPiece()).toBe(O.none);
    expect(afterPlay.getCurrentPlayer()).toBe('p2');
});

test('Player State Pass', () => {
    const playerState = new PlayerState();
    expect(playerState.getCurrentPlayer()).toBe('p1');

    const afterPass = playerState.toggleCurrentPlayer();
    expect(afterPass.getCurrentPlayer()).toBe('p2');

    const afterPieceSelection = afterPass.selectPiece('piece1');

    const afterPass2 = afterPieceSelection.toggleCurrentPlayer();
    expect(afterPass2.getCurrentPlayer()).toBe('p1');
    expect(afterPass2.getSelectedPiece()).toBe(O.none);
})