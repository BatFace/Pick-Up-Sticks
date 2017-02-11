import { START, STOP, TICK, RESET } from '../actions/timerAction';

//Based on https://github.com/jaysoo/example-redux-saga/blob/master/src/timer
export default function timer (
    state = {
        status: 'Stopped',
        seconds: 0
    }, action) => {
    switch (action.type) {
        case START:
            return { ...state, status: 'Running' };
        case STOP:
            return { ...state, status: 'Stopped' };
        case TICK:
            return { ...state, seconds: state.seconds + 1 };
        case RESET:
            return { ...state, seconds: 0 };
        default:
            return state
    }
}

export const getTimeInSeconds = (state) => state.seconds;

export const getStatus = (state) => state.status;

