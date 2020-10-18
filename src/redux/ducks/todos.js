import ActionType from '../types';

const defaultState = {
    routeValue: '',
    defaultValue: 'default',
};

const todos = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.ROUTE_CHANGE:
            return {
                ...state,
                routeValue: action.value,
            }
        case ActionType.INPUT_CLEAR:
            return {
                ...state,
                routeValue: '',
            }
        default:
            return state
    }
}
export default todos;