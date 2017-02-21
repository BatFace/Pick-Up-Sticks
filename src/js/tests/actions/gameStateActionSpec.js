import { assert } from 'chai';

import * as gameActions from '../../actions/gameStateAction';

describe('gameStateAction', () => {
    it('should create an action to pause game', () => {
        const expectedAction = {
            type: gameActions.PAUSED
        };

        assert.deepEqual(gameActions.pauseGame(), expectedAction);
    });

    it('should create an action to win game', () => {
        const
            expectedAction = {
                type: gameActions.WON
            };

        assert.deepEqual(gameActions.winGame(), expectedAction);
    });

    it('should create an action to set game state to in play', () => {
        const
            expectedAction = {
                type: gameActions.IN_PLAY
            };

        assert.deepEqual(gameActions.playGame(), expectedAction);
    });

    it('should create an action to lose game', () => {
        const expectedAction = {
                type: gameActions.LOST
            };

        assert.deepEqual(gameActions.loseGame(), expectedAction);
    });
});