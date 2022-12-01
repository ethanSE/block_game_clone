import { createContext } from "react";
import { GSReducerType } from '../hooks/useGameState'
import { GameState } from "../classes/GameState";

const GameStateContext = createContext<GSReducerType>([new GameState(), () => { }]);
export default GameStateContext
