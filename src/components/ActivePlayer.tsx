// //state/context
import { useContext } from 'react';
import GameStateContext from '../context/GameStateContext';

//styles
import css from '../styles/ActivePlayer.module.css';

function ActivePlayer() {
    const [gameState, dispatch] = useContext(GameStateContext);
    const currentPlayer = gameState.getCurrentPlayer();

    return (
        <div className={css['activePlayer']}>
            <div className={css['activePlayerRow']}>
                <h1>Current Player: </h1>
                <div className={css[currentPlayer]}></div>
            </div>
            <button
                onClick={() => dispatch({ type: "passTurn" })}
                className={css.passButton}
                style={{ borderRadius: '5px', backgroundColor: 'teal', padding: '5px' }}
            >Pass Turn</button>
        </div>
    );
}

export default ActivePlayer;