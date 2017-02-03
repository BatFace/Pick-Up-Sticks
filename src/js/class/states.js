export const INIT = 'init';
export const PAUSED = 'paused';
export const WON = 'won';
export const LOST = 'lost';

export const States = {
    init: {
        message: 'Let\'s play!',
    },
    paused: {
        message: 'Paused.',
    },
    won: {
        message: 'You won! Why not pick a different level?',
    },
    lost: {
        message: 'You lost. That\'s a shame.',
    }
};

export default function selectState(state = {}, action) {
    switch (action) {
        case PAUSED: {
            return States[PAUSED];
        }
        case WON: {
            return Object.assign({}, state, action.user, {
                hasChanges: true,
                reducedAt: new Date()
            });
        }
        case LOST: {
            if(state.id == action.userId)
            {
                return {};
            }

            return state;
        }
        case INIT:
        default:
            return state;
    }
}