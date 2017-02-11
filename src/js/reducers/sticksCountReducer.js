import { SET_INITIAL_COUNT, REMOVE_STICK, RESET_STICKS_COUNT } from '../actions/sticksCountAction';

const defaultState = {
    initialSticksCount: 1,
    currentSticksCount: 0
};

export default function sticksCount (state = defaultState, action) {
    switch (action.type) {
        case SET_INITIAL_COUNT:
            return Object.assign({}, state, {
                initialSticksCount: action.initialSticksCount,
                currentSticksCount: action.initialSticksCount
            });
        case REMOVE_STICK:
            // if(action.stickId === currentSticksCount) {
            //     return Object.assign({}, state, {
            //         currentSticksCount: state.currentSticksCount - 1
            //     })
            // }
            // else {
            //     return state
            // }
            return Object.assign({}, state, {
                currentSticksCount: state.currentSticksCount - 1
            })
        case RESET_STICKS_COUNT:
            return Object.assign({}, state, {
                currentSticksCount: state.initialSticksCount
            });
        default:
            return state;
    }
}