import { createContext } from "react";
import { GS } from '../hooks/useGameState'

const GameStateContext = createContext<GS>([[], () => { }]);
export default GameStateContext
