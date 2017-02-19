export const INIT = 'init';
export const PAUSED = 'paused';
export const WON = 'won';
export const LOST = 'lost';
export const IN_PLAY = 'active';

export function pauseGame() {
    return {
        type: PAUSED,
    };
}

export function winGame() {
    return {
        type: WON,
    };
}

export function playGame() {
    return {
        type: IN_PLAY,
    };
}

export function loseGame() {
    return {
        type: LOST,
    };
}
