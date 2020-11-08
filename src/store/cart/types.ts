export const ADD_CART = 'SEND_MESSAGE'
export const REMOVE_CART = 'DELETE_MESSAGE'
export const UPDATE_CART = 'UPDATE_CART'

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

export type CartActionTypes = AddCartAction | RemoveCartAction | UpdateCartAction