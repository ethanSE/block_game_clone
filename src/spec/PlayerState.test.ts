import { PlayerState } from '../classes/PlayerState';
import * as O from 'fp-ts/lib/Option'

test('Player State', () => {
    const playerState = new PlayerState();
    expect(playerState.getSelectedPieceName()).toBe(O.none);
    expect(playerState.getCurrentPlayer()).toBe('p1')

    const afterSelection = playerState.selectPiece('otherOne');
    expect(afterSelection.getSelectedPieceName()).toStrictEqual(O.some({ name: 'otherOne', status: 'selected' }))

    const afterPlay = afterSelection.playSelectedPiece();
    expect(afterPlay.getSelectedPieceName()).toBe(O.none);
    expect(afterPlay.getCurrentPlayer()).toBe('p2');
});

test('Player State Pass', () => {
    const playerState = new PlayerState();
    expect(playerState.getCurrentPlayer()).toBe('p1');

    const afterPass = playerState.toggleCurrentPlayer();
    expect(afterPass.getCurrentPlayer()).toBe('p2');

    const afterPieceSelection = afterPass.selectPiece('shortL');

    const afterPass2 = afterPieceSelection.toggleCurrentPlayer();
    expect(afterPass2.getCurrentPlayer()).toBe('p1');
    expect(afterPass2.getSelectedPieceName()).toBe(O.none);
})