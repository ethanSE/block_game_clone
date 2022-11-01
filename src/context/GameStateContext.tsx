import { createContext } from "react";
import { defaultState, GSReducerType } from '../hooks/useGameState'

const GameStateContext = createContext<GSReducerType>([defaultState, () => { }]);
export default GameStateContext
