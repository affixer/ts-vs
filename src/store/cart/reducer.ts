import * as TYPES from './types';

const initialState: TYPES.CartState = {
    carts: []
}

export function cartReducer(state = initialState, action: TYPES.CartActionTypes): TYPES.CartState {
    switch (action.type) {
        case TYPES.ADD_CART:
            return {
                carts: [...state.carts, action.payload]
            }
        case TYPES.REMOVE_CART:
            return {
                carts: state.carts.filter(cart => cart.id !== action.meta.id)
            }
        case TYPES.UPDATE_CART:
            return {
                carts: state.carts.map(cart =>
                    cart.id !== action.meta.id ? cart
                        : { ...cart, quantity: action.payload.quantity })
            }
        default:
            return state
    }
}