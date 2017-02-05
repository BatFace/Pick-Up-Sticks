import { INIT, PAUSED, WON, LOST, ACTIVE } from '../actions/gameStateAction';

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

export default function gameState (state = {}, action) {
    switch (action.state) {
        case ACTIVE:
            return { message : '' };
        case PAUSED:
            return { message: 'Paused.' };
        case WON:
            return { message: 'You won! Why not pick a different level?' };
        case LOST:
            return { message: 'You lost. That\'s a shame.' };
        case INIT:
        default:
            return { message: 'Let\'s play!' };
    }
}