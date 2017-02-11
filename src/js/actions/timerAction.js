export const START = 'startTimer';
export const TICK = 'tickTimer';
export const STOP = 'stopTimer';
export const RESET = 'resetTimer';

export const start = () => ({ type: START });

export const tick = () => ({ type: TICK });

export const stop = () => ({ type: STOP });

export const reset = () => ({ type: RESET });
