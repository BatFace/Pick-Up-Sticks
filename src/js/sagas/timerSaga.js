import { delay } from 'redux-saga';
import {select, cancel, put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import * as timerActions from '../actions/timerAction'
import * as gameStateActions from '../actions/gameStateAction';
import * as stickActions from '../actions/sticksAction';
import 'babel-polyfill';

// Based on http://stackoverflow.com/a/37693674
function* runTimer() {
    yield call(delay, 100);
    yield put(timerActions.tick());
    const timer = yield select(state => state.timer);

    if (timer.status === 'Finished') {
        yield put(gameStateActions.loseGame());
    }
}

export default function* runTimerSaga() {
    const workerTask = yield takeEvery([
        gameStateActions.ACTIVE,
        timerActions.TICK_TIMER
    ], runTimer);

    yield takeLatest([
        gameStateActions.PAUSED,
        gameStateActions.WON,
        gameStateActions.INIT,
        stickActions.RESET_STICKS_COUNT,
        stickActions.SET_NEW_STICKS_COUNT
    ], pauseTimerSaga, workerTask);
}

function* pauseTimerSaga (task) {
    yield cancel(task);
    yield runTimerSaga();
}