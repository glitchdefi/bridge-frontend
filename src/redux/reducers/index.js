import { combineReducers } from "redux";
import utils from "./utils.reducer";
import wallet from "./wallet.reducer";

const reducers = combineReducers({
  utils,
  wallet,
});

export default reducers;
