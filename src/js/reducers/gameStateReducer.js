import { INIT, PAUSED, WON, LOST, IN_PLAY } from '../actions/gameStateAction';
import { RESET_STICKS_COUNT, SET_NEW_STICKS_COUNT } from '../actions/sticksAction';

const initialState = {
    name: INIT,
    canPlayPause: true,
    message: 'Let\'s play!'
};

export default function gameState (state = initialState, action) {
    switch (action.type) {
        case IN_PLAY:
            return {
                name: IN_PLAY,
                canPlayPause: true,
                message : ''
            };
        case PAUSED:
            return {
                name: PAUSED,
                canPlayPause: true,
                message : 'Paused.'
            };
        case WON:
            return {
                name: WON,
                canPlayPause: false,
                message: 'You won! Why not pick a different level?'
            };
        case LOST:
            return {
                name: LOST,
                canPlayPause: false,
                message: 'You lost. That\'s a shame.'
            };
        case SET_NEW_STICKS_COUNT:
        case RESET_STICKS_COUNT:
        case INIT:
            return initialState;
        default:
            return state;
    }
}