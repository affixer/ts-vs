import * as TYPES from './types'

export const addCart = (cart: TYPES.Cart): TYPES.CartActionTypes => (
    {
        type: TYPES.ADD_CART,
        payload: {
            ...cart
        }
    }
)

export function deleteCart(id: string): TYPES.CartActionTypes {
    return {
        type: TYPES.REMOVE_CART,
        meta: {
            id
        }
    }
}

export function updateCart(id: string, quantity: number): TYPES.CartActionTypes {
    return {
        type: TYPES.UPDATE_CART,
        meta: {
            id
        },
        payload: {
            quantity
        }
    }
}