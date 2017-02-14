export const START_TIMER = 'startTimer';
export const TICK_TIMER = 'tickTimer';
export const STOP_TIMER = 'stopTimer';
export const RESET_TIMER = 'resetTimer';

export const start = () => ({ type: START_TIMER });

export const tick = () => ({ type: TICK_TIMER });

export const stop = () => ({ type: STOP_TIMER });

export const reset = () => ({ type: RESET_TIMER });
