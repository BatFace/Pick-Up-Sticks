import { START_TIMER, STOP_TIMER, TICK_TIMER, RESET_TIMER } from '../actions/timerAction';
import { PAUSED, ACTIVE } from '../actions/gameStateAction';

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
        case RESET_TIMER:
            return Object.assign({}, initialState);
        default:
            return state
    }
}

export const getStatus = (state) => state.status;

