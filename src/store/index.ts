import { combineReducers, createStore } from 'redux'
import { cartReducer } from './cart/reducer'
import { userReducer } from './user/reducer'

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
(window as any).__REDUX_DEVTOOLS_EXTENSION__())

export default store