import { START, STOP, TICK, RESET } from '../actions/timerAction';

//Based on https://github.com/jaysoo/example-redux-saga/blob/master/src/timer

export const initialState = {
    status: 'Stopped',
    seconds: 30
};

export default (
    state = initialState, action) => {
    switch (action.type) {
        case START:
            return Object.assign({}, state, {
                status: 'Running'
            });
        case STOP:
            return Object.assign({}, state, {
                status: 'Stopped'
            });
        case TICK:
            if(state.seconds - 1 > 0) {
                return Object.assign({}, state, {
                    seconds: state.seconds - 1
                });
            } else {
                return Object.assign({}, state, {
                    seconds: 0,
                    status: 'Stopped'
                });
            }
        case RESET:
            return Object.assign({}, initialState);
        default:
            return state
    }
}

export const getTimeInSeconds = (state) => state.seconds;

export const getStatus = (state) => state.status;

