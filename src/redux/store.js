import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root_saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, createLogger());

const store = createStore(reducers, middleware);

sagaMiddleware.run(rootSaga);

export default store;
