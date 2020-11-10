import Axios from 'axios'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from '../store'
import { clearCart } from '../store/cart/actions'

import { Cart as CartType, CartState } from '../store/cart/types'
import { User } from '../store/user/types'

import '../styles/cart.css'

import { parsePrice } from '../utils'

export default function Cart() {
    const { carts }: CartState = useSelector((state: RootState) => state.cart)
    const { token } : User = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const [ status, setStatus ] = React.useState<string>('idle')

    const calculateTotalCost = () => {
        let totalCost = 0
        for (const cart of carts)
            totalCost += cart.quantity * cart.price
        return parsePrice(totalCost)
    }
    const checkOutNow = () => {
        if (!carts.length) return
        setStatus('loading')
        Axios({
            method: 'POST',
            url: '/api/cart/checkout',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                items: carts.map(cart => cart.id)
            }            
        }).then(resp => {
            setStatus('checkedout')
            dispatch(clearCart())
            console.log(resp.data)
        }).catch(err => {
            setStatus('idle')
            toast.error("Failed to checkout.")
            console.log(err.message)
        })
    }
    return (
        <React.Fragment>
            <div className="heading-controls">
                <h1>Cart</h1>
                <div className="totalCost">
                    <p>Total:</p>
                    <p className="cost">
                        NPR {calculateTotalCost()}/-
                    </p>
                </div>
                <div className="controls">
                    <button onClick={checkOutNow}>Checkout <i className={`material-icons ${status === 'loading' && 'laoding'}`}>{status === 'checkedout' ? 'done_all' : status === 'loading' ? 'loop' : 'shopping_basket'}</i></button>
                </div>
            </div>
            <div className="cartList">
                {
                    carts.length !== 0 &&
                    carts.map((item: CartType) => <CartItem cart={item} key={item.id} />)
                }
                {
                    carts.length === 0 &&
                    <div className="noCartItem">
                        <p>Your cart is empty.</p>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}



const CartItem = (props: { cart: CartType }) => {
    const { cart } = props
    return <div className="cartItem">
        <div className="meta">
            <h3>{cart.name}</h3>
            <p className="brand">
                {cart.brand}
            </p>
            <p className="price">
                Rs. {cart.price}/- <span>per unit.</span>
            </p>
        </div>
        <div className="cart-data">
            <p>
                Quantity: <span className="quantity">{cart.quantity}</span>
            </p>
        </div>
    </div>
}