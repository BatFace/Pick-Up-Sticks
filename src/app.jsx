import React from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import SticksGame from './js/components/sticksGame.jsx';
import gameState from './js/reducers/gameStateReducer';
import sticks from './js/reducers/sticksReducer';
import timer from './js/reducers/timerReducer';
import timerSaga from './js/sagas/timerSaga';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const reducers = combineReducers({
    gameState,
    sticks,
    timer
});

const store = createStoreWithMiddleware(reducers);

const Root = () => (
    <Provider store={store}>
        <SticksGame store={store}/>
    </Provider>
);

sagaMiddleware.run(timerSaga);

ReactDOM.render(<Root/>,  document.getElementById('app-root'));