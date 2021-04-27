import { takeLatest, put, delay, call } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { fetchLogout } from '../services';
import { helpers } from '../../utils/helpers';
import { history } from '../../utils/history';
import { ROUTES, MESSAGES, ACTION_CONST, LOCAL_STORAGE } from '../../constants';
import { handleLocalStorage } from '../../utils/handleLocalStorage'





function* handleLogout() {
    try {
        const result = yield call(fetchLogout);
        // const result = yield fetchLogout();
        // debugger
        if (result.status === HttpStatus.OK) {
            yield put({
                type: ACTION_CONST.LOG_OUT_SUCCESS,
            });
            localStorage.removeItem(LOCAL_STORAGE.ASSET_UNW_WALLET);
            history.push(ROUTES.HOME)
        }

    } catch (error) {
        yield put({
            type: ACTION_CONST.LOGIN_FAIL
        });
    }
}

function* handleLogin(){
    try {
        const result = yield call(fetchLogout); 
    } catch (error) {
        
    }
}









export function* watchHandleLogout() {
    yield takeLatest(ACTION_CONST.REQUEST_LOG_OUT, handleLogout);
}

