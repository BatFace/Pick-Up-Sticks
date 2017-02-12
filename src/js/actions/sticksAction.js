export const REMOVE_STICK = 'tryRemove';
export const RESET_STICKS_COUNT = 'resetSticksCount';

export function removeStick(stickId) {
    return {
        type: REMOVE_STICK,
        stickId
    };
}

export function resetSticksCount() {
    return {
        type: RESET_STICKS_COUNT
    };
}
