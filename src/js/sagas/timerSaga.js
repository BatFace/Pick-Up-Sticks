import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import * as actions from '../actions/timerAction'
import 'babel-polyfill';

// Based on https://github.com/jaysoo/example-redux-saga/blob/master/src/timer
const wait = ms => (
    new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
)

function* runTimer() {
    const channel = yield actionChannel(actions.START);

    while(yield take(channel)) {
        while(true) {
            const winner = yield race({
                stopped: take(actions.STOP),
                tick: call(wait, 1000)
            });

            if (!winner.stopped) {
                yield put(actions.tick())
            } else {
                break
            }
        }
    }
}

export default runTimer