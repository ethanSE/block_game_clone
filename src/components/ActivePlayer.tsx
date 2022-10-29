// //state/context
import { useContext } from 'react';
import GameStateContext from '../context/GameStateContext';

//styles
import './ActivePlayer.css';

function ActivePlayer() {
    const [gameState, dispatch] = useContext(GameStateContext);

    return (
        <div className='activePlayer'>
            <div className='activePlayerRow'>
                <h1>Current Player: </h1>
                <div className={`${gameState.currentPlayer} playerColorIndicator`}></div>
            </div>
            <button
                onClick={() => dispatch({ type: "passTurn" })}
                className={'PassButton'}
            >Pass Turn</button>
        </div>
    );
}

export default ActivePlayer;