export const ADD_CART = 'ADD_CART'
export const REMOVE_CART = 'REMOVE_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const CLEAR_CART = 'CLEAR_CART'

export interface Cart {
    id: string
    name: string
    brand?: string
    quantity: number
}

export interface CartState {
    carts: Cart[]
}

interface AddCartAction {
    type: typeof ADD_CART
    payload: Cart
}
interface RemoveCartAction {
    type: typeof REMOVE_CART
    meta: {
        id: string
    }
}
interface UpdateCartAction {
    type: typeof UPDATE_CART
    meta: {
        id: string
    },
    payload: {
        quantity: number
    }
}
interface ClearCartAction {
    type: typeof CLEAR_CART
}

export type CartActionTypes = AddCartAction | RemoveCartAction | UpdateCartAction | ClearCartAction