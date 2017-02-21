import { assert } from 'chai';

import * as sticksAtion from '../../actions/sticksAction';

describe('sticksAction', () => {
    it('should create an action to set new sticks count', () => {
        const expectedAction = {
            type: sticksAtion.SET_NEW_STICKS_COUNT,
            count: 5
        };

        assert.deepEqual(sticksAtion.setNewSticksCount(5), expectedAction);
    });

    it('should create an action to reset sticks count', () => {
        const expectedAction = {
            type: sticksAtion.RESET_STICKS_COUNT
        };

        assert.deepEqual(sticksAtion.resetSticksCount(), expectedAction);
    });

});