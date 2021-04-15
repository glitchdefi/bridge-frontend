import { ACTION_CONST } from "../../constants";

const INITIAL_STATE = {
  projects: [],
  openingProjects: [],
  waitingProjects: [],
  closedProjects: [],
  selectedProject: null,
  currentWalletInfo: null,
  contractsInfo: [],
  currentSelectedContractAddress: null,
  // listContractAddressSelected: [],
  jobGetProjectSelected : 0,
  jobGetWalletInfo: 0,
  jobCountDownOpen: 0,
  jobCountDownClose: 0,
  jobCountDownRoundTime: 0,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_CONST.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.data.projects,
        openingProjects: action.data.openingProjects,
        waitingProjects: action.data.waitingProjects,
        closedProjects: action.data.closedProjects,
      };
    case ACTION_CONST.GET_LIST_CONTRACTS_INFO:
      return {
        ...state,
        contractsInfo: action.data,
      };
    case ACTION_CONST.GET_PROJECT_SELECTED:
      // debugger;
      // const project = action.data;
      // if (project) {
      //   if (state.currentSelectedContractAddress === project.contract) {
          return {
            ...state,
            selectedProject: action.data,
          };
      //   }
      // }
    case ACTION_CONST.SET_CURRENT_CONTRACT_SELECTED:
 
      return {
        ...state,
        currentSelectedContractAddress: action.data,
      };

    case ACTION_CONST.SET_JOB_PROJECT_SELECTED:

      clearInterval(state.jobGetProjectSelected);
      return {
        jobGetProjectSelected : action.data,
      };

  
      case ACTION_CONST.SET_JOB_GET_WALLET_INFO:

        clearInterval(state.jobGetWalletInfo);
        return {
          jobGetWalletInfo : action.data,
        };    

      case ACTION_CONST.SET_JOB_COUNT_DOWN_OPEN:
        clearInterval(state.jobCountDownOpen);
       
        return {
          ...state,
          jobCountDownOpen : action.data,
        };  
        case ACTION_CONST.SET_JOB_COUNT_DOWN_CLOSE:
        clearInterval(state.jobCountDownClose);
       
        return {
          ...state,
          jobCountDownClose : action.data,
        };   
        case ACTION_CONST.SET_JOB_COUNT_DOWN_ROUND:
        clearInterval(state.jobCountDownRoundTime);
       
        return {
          ...state,
          jobCountDownRoundTime : action.data,
        };         

    case ACTION_CONST.CLEAR_INTERVAL_JOB:

    clearInterval(state.jobGetProjectSelected);
    clearInterval(state.jobGetWalletInfo);
    return {
      ...state,
      jobGetProjectSelected : 0,
      jobGetWalletInfo: 0
    };
    default:
      return state;
  }
};
