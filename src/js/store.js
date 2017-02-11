import { createStore, combineReducers} from 'redux';
import gameState from './reducers/gameStateReducer';
import sticksCount from './reducers/sticksCountReducer';


const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);


const reducers = combineReducers({
    gameState,
    sticksCount
});

export default createStore(
    reducers
);