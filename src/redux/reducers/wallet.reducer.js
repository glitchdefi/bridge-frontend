import { ACTION_CONST } from "../../constants";

const INITIAL_STATE = {
  walletInfo: {},
  currentInputNetwork: "eth",
  jobGetBalance: 0,
  currentNetWorkId: '0x',
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_CONST.GET_INFO_WALLET:
      return {
        ...state,
        walletInfo: action.data,
      };
    case ACTION_CONST.CURRENT_INPUT_NETWORK:
      return {
        ...state,
        currentInputNetwork: action.data,
      };

    case ACTION_CONST.CURRENT_NET_WORK_EXTENSION:
      return {
        ...state,
        currentNetWorkId: action.data,
      };
    case ACTION_CONST.SET_JOB_GET_BALANCE:
      clearInterval(state.jobGetBalance);
      return {
        ...state,
        jobGetBalance: action.data,
      };

    default:
      return state;
  }
};
