import { createStore, combineReducers} from 'redux';
import gameState from './reducers/gameStateReducer';

const reducers = combineReducers({
    gameState
});

export default createStore(
    reducers
);