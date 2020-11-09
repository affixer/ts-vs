import { Cart } from './../cart/types';
export const ADD_TO_CHECKOUT = 'ADD_TO_CHECKOUT'
export const REMOVE_FROM_CHECKOUT = 'REMOVE_FROM_CHECKOUT'

export interface CheckoutState {
    carts: Cart[]
}

interface AddToCheckOutAction {
    type: typeof ADD_TO_CHECKOUT
    payload: Cart
}
interface RemoveFromCheckout {
    type: typeof REMOVE_FROM_CHECKOUT
    meta: {
        id: string
    }
}

export type CheckOutActionTypes = AddToCheckOutAction | RemoveFromCheckout