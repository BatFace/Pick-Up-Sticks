export const SET_NEW_STICKS_COUNT = 'setNewSticksCount';
export const RESET_STICKS_COUNT = 'resetSticksCount';

export function setNewSticksCount(count) {
    return {
        type: SET_NEW_STICKS_COUNT,
        count
    };
}


export function resetSticksCount() {
    return {
        type: RESET_STICKS_COUNT
    };
}
