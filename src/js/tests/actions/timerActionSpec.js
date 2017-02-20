import chai from 'chai';
var assert = chai.assert;

import * as timerActions from '../../actions/timerAction';

describe('timerAction', () => {
    it('should create an action to tick', () => {
        const expectedAction = {
            type: timerActions.TICK_TIMER
        };

        assert.deepEqual(timerActions.tick(), expectedAction);
    });

});