import { INIT, PAUSED, WON, LOST, ACTIVE } from '../actions/gameStateAction';
import { RESET_STICKS_COUNT, SET_NEW_STICKS_COUNT } from '../actions/sticksAction';

const intialState = {
    name: INIT,
    canPlayPause: true,
    message: 'Let\'s play!'
};

export default function gameState (state = intialState, action) {
    switch (action.type) {
        case ACTIVE:
            return {
                name: ACTIVE,
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
            return intialState;
        default:
            return state;
    }
}