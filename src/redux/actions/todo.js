import ActionType from '../types';

export function clearMsg() {
    return {
        type: ActionType.INPUT_CLEAR
    }
}
export function routeChange(value) {
    return {
        type: ActionType.ROUTE_CHANGE,
        value,
    }
}