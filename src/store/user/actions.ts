import * as TYPES from './types'

export const logIn = (token: string): TYPES.UserActionTypes => (
    {
        type: TYPES.LOGIN,
        payload: {
            token
        }
    }
)

export function logOut(id: string): TYPES.UserActionTypes {
    return {
        type: TYPES.LOGOUT
    }
}