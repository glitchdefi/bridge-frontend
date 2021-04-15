import { ACTION_CONST } from "../../constants";

export default alert = (state = {}, action = { type: '' }) => {

    switch (action.type) {
        case ACTION_CONST.ALERT_SUCCESS:
            return {
                type: 'success',
                message: action.message
            };
        case ACTION_CONST.ALERT_FAILS:
            return {
                type: 'error',
                message: action.message
            };
        case ACTION_CONST.ALERT_WARNING:
            return {
                type: 'warning',
                message: action.message
            };    
        case ACTION_CONST.ALERT_CLEAR:
            return {};
        default:
            return state
    }
}