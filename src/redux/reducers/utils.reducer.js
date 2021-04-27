import { ACTION_CONST } from "../../constants";
const initialState = {
  blocking: false,
  leftBarActive: true,
  isConnectWallet: false,
  walletAddress: null,
  walletUtils:null,
  showModalHelp:false,
  alertLink: {
    type: '',
    url: '',
    message: ''
  },
}
export default(state = initialState, action)=> {

  switch (action.type) {

    case ACTION_CONST.REQUEST_SUBMIT:
      return {
        ...state,
        blocking: true,
      }
      
    case ACTION_CONST.REQUEST_DONE:
      return {
        ...state,
        blocking: false,
      }
    case ACTION_CONST.CLICK_LEFT_BAR_ACTIVE:
      return {
          ...state,
          leftBarActive: !state.leftBarActive,
      }
    case ACTION_CONST.ALERT_LINK:
      return {
          ...state,
          alertLink: {
            type: action.alertType,
            url: action.alertUrl,
            message: action.alertMessage
          }
      };
    case ACTION_CONST.ALERT_LINK_CLEAR:
      return {
          ...state,
          alertLink: {
            type: '',
            url: '',
            message: ''
          }
      };
    case ACTION_CONST.CONNECT_WALLET_SUCCESS:
      return {
          ...state,
          isConnectWallet: true,
          walletAddress: action.data

      };

    case ACTION_CONST.ENABLE_WALLET_SUCCESS:
      return {
        ...state,
        isConnectWallet: true,
        walletUtils: action.data

    }; 
    case ACTION_CONST.LOG_OUT_WALLET_SUCCESS:
      return {
          ...state,
          isConnectWallet: false,
          walletAddress: null,
          walletUtils: null
      };  

    case ACTION_CONST.SET_SHOW_MODAL_HELP  :
      return {
        ...state,
        showModalHelp: true
    }; 
    default:
      return state
  }
}