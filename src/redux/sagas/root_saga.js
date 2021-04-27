import { fork, all } from 'redux-saga/effects';

import { watchSubmitGetProjects, watchSubmitSelectedProjects } from './userSaga';


export default function* rootSaga() {
    yield all([
        fork(watchSubmitGetProjects),
        fork(watchSubmitSelectedProjects)
    ]);
}