export const REMOVE_STICK = 'tryRemove';
export const SET_NEW_STICKS_COUNT = 'setNewSticksCount';
export const RESET_STICKS_COUNT = 'resetSticksCount';

export function removeStick(stickId) {
    return {
        type: REMOVE_STICK,
        stickId
    };
}

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
