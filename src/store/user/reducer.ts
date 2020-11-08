import * as TYPES from './types';

const initialState: TYPES.User = {
    token: null
}

export function userReducer(state = initialState, action: TYPES.UserActionTypes): TYPES.User {
    switch (action.type) {
        case TYPES.LOGIN:
            return {
                token: action.payload.token
            }
        case TYPES.LOGOUT:
            return {
                token: null
            }
        default:
            return state
    }
}