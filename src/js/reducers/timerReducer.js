import { START_TIMER, STOP_TIMER, TICK_TIMER, RESET_TIMER } from '../actions/timerAction';
import { PAUSED, IN_PLAY, WON } from '../actions/gameStateAction';
import { SET_NEW_STICKS_COUNT, RESET_STICKS_COUNT } from '../actions/sticksAction';

export const initialState = {
    status: 'Paused',
    centiseconds: 300
};

export default (
    state = initialState, action) => {
    switch (action.type) {
        case IN_PLAY:
        case START_TIMER:
            return Object.assign({}, state, {
                status: 'Running'
            });
        case WON:
        case PAUSED:
        case STOP_TIMER:
            return Object.assign({}, state, {
                status: 'Paused'
            });
        case TICK_TIMER:
            if(state.centiseconds - 1 > 0) {
                return Object.assign({}, state, {
                    centiseconds: state.centiseconds - 1
                });
            } else {
                return Object.assign({}, state, {
                    centiseconds: 0,
                    status: 'Finished'
                });
            }
        case SET_NEW_STICKS_COUNT:
        case RESET_STICKS_COUNT:
        case RESET_TIMER:
            return Object.assign({}, initialState);
        default:
            return state
    }
}

export function getTimeInSeconds(state) {
    return (state.centiseconds / 10).toFixed(1);
}

