import { takeLatest, put, delay, call } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { fetchLogout } from '../services';
import { helpers } from '../../utils/helpers';
import { history } from '../../utils/history';











export function* watchHandleLogout() {
    yield takeLatest(ACTION_CONST.REQUEST_LOG_OUT, handleLogout);
}

