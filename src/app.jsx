import React from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import SticksGame from './js/views/sticksGame.jsx';
import gameState from './js/reducers/gameStateReducer';
import sticksCount from './js/reducers/sticksCountReducer';
import timerSaga from './js/sagas/timerSaga';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const reducers = combineReducers({
    gameState,
    sticksCount
});

const store = createStoreWithMiddleware(reducers);

const Root = () => (
    <Provider store={store}>
        <SticksGame store={store}/>
    </Provider>
);

sagaMiddleware.run(timerSaga);

ReactDOM.render(<Root/>,  document.getElementById('app-root'));