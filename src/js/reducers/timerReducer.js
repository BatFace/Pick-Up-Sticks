import { START_TIMER, STOP_TIMER, TICK_TIMER, RESET_TIMER } from '../actions/timerAction';
import { PAUSED, ACTIVE, WON } from '../actions/gameStateAction';
import { SET_NEW_STICKS_COUNT, RESET_STICKS_COUNT } from '../actions/sticksAction';

export const initialState = {
    status: 'Paused',
    seconds: 30
};

export default (
    state = initialState, action) => {
    switch (action.type) {
        case ACTIVE:
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
            if(state.seconds - 1 > 0) {
                return Object.assign({}, state, {
                    seconds: state.seconds - 1
                });
            } else {
                return Object.assign({}, state, {
                    seconds: 0,
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

export const getStatus = (state) => state.status;

