import { ACTION_CONST } from "../../constants";

export function actAlertSuceess(message){
    return {
        type: ACTION_CONST.ALERT_SUCCESS,
        message

    }
}

export function actAlertFails(message){
    return {
        type: ACTION_CONST.ALERT_FAILS,
        message
    }
}

export function actAlertClear(){
    return {
        type: ACTION_CONST.ALERT_CLEAR,
    }
}

export function actAlertLinkClear(){
    return {
        type: ACTION_CONST.ALERT_LINK_CLEAR,
    }
}

export function actAlertMsgFail(message) {
    return {
        type: ACTION_CONST.ALERT_FAILS,
        message
    }
}

export function actAlertMsgWarning(message) {
    return {
        type: ACTION_CONST.ALERT_WARNING,
        message
    }
}

export function actAlertMsgSuccess(message) {
    return {
        type: ACTION_CONST.ALERT_SUCCESS,
        message
    }
}


export function actRequestSubmit() {
    return {
        type: ACTION_CONST.REQUEST_SUBMIT,
    }
}
export function actDoneSubmit() {
    return {
        type: ACTION_CONST.REQUEST_DONE,
    }
}