import { RESET_STICKS_COUNT, SET_NEW_STICKS_COUNT } from '../actions/sticksAction';

const defaultState = {
    initialSticksCount: 1,
    currentSticksCount: 0,
    createdAt: 0
};

export default function sticksCount (state = defaultState, action) {
    switch (action.type) {
        case RESET_STICKS_COUNT:
            return Object.assign({}, state, {
                currentSticksCount: state.initialSticksCount,
                createdAt: Date.now()
            });
        case SET_NEW_STICKS_COUNT:
            const newSticksCount = Math.min(action.count, 999);

            return Object.assign({}, state, {
                initialSticksCount: newSticksCount,
                currentSticksCount: newSticksCount,
                createdAt: Date.now()
            });
        default:
            return state;
    }
}