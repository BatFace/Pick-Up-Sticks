export const INIT = 'init';
export const PAUSED = 'paused';
export const WON = 'won';
export const LOST = 'lost';
export const ACTIVE = 'active';

export function setGameState(newState) {
    return {
        state : newState
    };
}
