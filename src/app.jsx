import React from 'react';
import ReactDOM from 'react-dom';
import SticksGame from './js/views/sticksGame.jsx';
import { Provider } from 'react-redux';
import store from './js/store';

ReactDOM.render(
    <Provider store={store}>
        <SticksGame store={store}/>
    </Provider>,
    document.getElementById('app-root')
);