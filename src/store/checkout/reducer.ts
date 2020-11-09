import * as TYPES from './types';

const initialState: TYPES.CheckoutState = {
    carts: []
}

export function userReducer(state = initialState, action: TYPES.CheckOutActionTypes): TYPES.CheckoutState {
    switch (action.type) {
        case TYPES.ADD_TO_CHECKOUT:
            return {
                carts: [...state.carts, action.payload]
            }
        case TYPES.REMOVE_FROM_CHECKOUT:
            return {
                carts: state.carts.filter(cart => cart.id !== action.meta.id)
            }
        default:
            return state
    }
}