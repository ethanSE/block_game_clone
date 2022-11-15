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
            >Pass Turn</button>
        </div>
    );
}

export default ActivePlayer;