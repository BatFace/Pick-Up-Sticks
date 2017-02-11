import { INIT, PAUSED, WON, LOST, ACTIVE } from '../actions/gameStateAction';
import { RESET_STICKS_COUNT, REMOVE_STICK } from '../actions/sticksCountAction';

// export const States = {
//     [INIT]: {
//         message: 'Let\'s play!',
//     },
//     [PAUSED]: {
//         message: 'Paused.',
//     },
//     [WON]: {
//         message: 'You won! Why not pick a different level?',
//     },
//     [LOST]: {
//         message: 'You lost. That\'s a shame.',
//     },
//     [ACTIVE]: {
//         message: ''
//     }
// };

const intialState = { name: INIT, message: 'Let\'s play!' };

export default function gameState (state = intialState, action) {
    switch (action.type) {
        case ACTIVE:
            return { name: ACTIVE, message : '' };
        case PAUSED:
            return { name: PAUSED, message: 'Paused.' };
        case REMOVE_STICK:
            if(action.stickId === 0) {
                return {name: WON, message: 'You won! Why not pick a different level?'};
            } else {
                return state;
            }
        case LOST:
            return { name: LOST, message: 'You lost. That\'s a shame.' };
        case INIT:
            return intialState;
        case RESET_STICKS_COUNT:
        default:
            return state;
    }
}