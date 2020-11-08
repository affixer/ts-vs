import { combineReducers, createStore } from 'redux'
import { cartReducer } from './cart/reducer'
import { userReducer } from './user/reducer'

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store