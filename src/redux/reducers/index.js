import { combineReducers } from 'redux';
import alert from './alert.reducer';
import utils from './utils.reducer';
import project from './project.reducer';
import wallet from './wallet.reducer';
const reducers = combineReducers({
    alert,
    utils,
    project,
    wallet
    
});

export default reducers;