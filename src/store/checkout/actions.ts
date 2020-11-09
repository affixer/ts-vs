import { Cart } from './../cart/types';
import * as TYPES from './types'

export const addCheckOut = (cart: Cart): TYPES.CheckOutActionTypes => (
    {
        type: TYPES.ADD_TO_CHECKOUT,
        payload: {
            ...cart
        }
    }
)

export function removeCheckOut(id: string): TYPES.CheckOutActionTypes {
    return {
        type: TYPES.REMOVE_FROM_CHECKOUT,
        meta: {
            id
        }
    }
}