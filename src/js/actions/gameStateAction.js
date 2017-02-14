export const INIT = 'init';
export const PAUSED = 'paused';
export const WON = 'won';
export const LOST = 'lost';
export const ACTIVE = 'active';

// TODO: Add actions for all the game states individually and import with * as gameStateActions

export function setGameState(newState) {
    return {
        type: newState,
    };
}

export function loseGame() {
    return {
        type: LOST,
    };
}
