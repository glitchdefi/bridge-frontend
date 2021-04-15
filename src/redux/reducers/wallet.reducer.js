import { ACTION_CONST } from "../../constants";

const INITIAL_STATE = {
  walletInfo: {},
  currentInputNetwork: ""
  
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
    // case ACTION_CONST.GET_KYC_3RD:
    //   return {
    //     ...state,
    //     kycURL: action.data,
    //   };
    // case ACTION_CONST.SET_JOB_GET_KYC:
    //   clearInterval(state.jobKyc);
    //   return {
    //     ...state,
    //     jobKyc: action.data,
    //   };
    // case ACTION_CONST.CLEAR_KYC_STATE: 
    // clearInterval(state.jobKyc);
    // return {
    //   ...state,
    //   kycStatus: null,
    // }; 

    default:
      return state;
  }
};
