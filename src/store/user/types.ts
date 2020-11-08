export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export interface User {
    token: string | null
}

interface LoginAction {
    type: typeof LOGIN
    payload: User
}
interface LogoutAction {
    type: typeof LOGOUT
}

export type UserActionTypes = LoginAction | LogoutAction