import { ACTION_CONST } from "../../constants";

export function actGetListProjects(){
    return {
        type: ACTION_CONST.SUBMIT_GET_PROJECTS,

    }
}
export function actSelectedProject(contract){
    return {
        type: ACTION_CONST.SUBMIT_PROJECT_SELECTED,
        data: contract

    }
}

export function actSetCurrentContract (contract){
    return {
        type: ACTION_CONST.SET_CURRENT_CONTRACT_SELECTED,
        data: contract
    } 
}

export function actGetWalletInfo(wallet){
    return {
        type: ACTION_CONST.GET_INFO_WALLET,
        data: wallet
    } 
}
