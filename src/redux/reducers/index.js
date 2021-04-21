import { combineReducers } from 'redux';
import alert from './alert.reducer';
import utils from './utils.reducer';
import wallet from './wallet.reducer';
const reducers = combineReducers({
    alert,
    utils,
    wallet
    
});

export default reducers;