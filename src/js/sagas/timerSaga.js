import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import { cancel, select } from 'redux-saga/effects';
import * as timerActions from '../actions/timerAction'
import * as gameStateActions from '../actions/gameStateAction';
import 'babel-polyfill';

export const getTimer = (state) => state.timer;

// Based on https://github.com/jaysoo/example-redux-saga/blob/master/src/timer
const wait = ms => (
    new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
)

function* runTimer() {
    const activeChannel = yield actionChannel(gameStateActions.ACTIVE);

    while (yield take(activeChannel)) {
        while (true) {
            const winner = yield race({
                paused: take(gameStateActions.PAUSED),
                tick: call(wait, 1000)
            });

            if (!winner.paused) {
                yield put(timerActions.tick());
                const timer = yield select(getTimer);

                if (timer.status === 'Finished') {
                    // TODO: check synchronicity
                    yield put(gameStateActions.loseGame());
                    break;
                }
            } else {
                    break;
                }
            }
        }
}

export default runTimer