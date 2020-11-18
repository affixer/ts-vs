import * as React from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { toast } from 'react-toastify';
import Truncate from 'react-truncate';
import { useDispatch, useSelector } from 'react-redux';

import { addCart, updateCart } from '../store/cart/actions'
import { RootState } from '../store';
import { Cart } from '../store/cart/types';

import { parsePrice } from '../utils';


const ProductItem = (props: { id: string, name: string, image?: string, price: number, brand?: string }) => {
    const dummyImage = 'https://dummyimage.com/600x400/5a27a7/fff.png'
    const dispatch = useDispatch()
    const { token } = useSelector((state: RootState) => state.user)
    const { carts } = useSelector((state: RootState) => state.cart)

    const AddToCart = () => {
        const thisCart: Cart[] = carts.filter((cartDetail: Cart) => cartDetail.id === props.id)
        if (!thisCart.length) {
            dispatch(addCart({
                id: props.id,
                name: props.name,
                brand: props.brand,
                quantity: 1,
                price: props.price
            }))
        } else {
            dispatch(updateCart(props.id, {
                quantity: 1 + thisCart[0].quantity
            }))
        }
        Axios({
            method: "POST",
            url: "/api/cart/addCart",
            data: {
                item: props.id,
                quantity: 1
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            toast.info("Item added to cart.")
        }).catch(err => {
            console.error(err.message)
            toast.error(err.message)
        })
    }

    const alertNotLoggedIn = () => {
        toast.error("You're not logged in")
    }

    return <div className="card">
        <div className="card-image" style={{
            backgroundImage: `url(${props.image || dummyImage})`
        }}>
        </div>
        <div className="card-meta">
            <p className="brand">
                <Link to={`/brand/${props.brand?.toString().toLowerCase() || 'no-brand'}`}>
                    <span className="brand-text">
                        <Truncate lines={1} ellipsis="...">
                            {props.brand || "No brand"}
                        </Truncate>
                    </span>
                </Link>
            </p>
            <h3>
                <Truncate lines={2} ellipsis="...">
                    {props.name}
                </Truncate>
            </h3>
        </div>
        <div className="card-footer">
            <p className="price">
                <span className="currency">Rs.</span>{parsePrice(props.price)}
            </p>
            <button className={!token ? "notLoggedInButton" : ""} onClick={token ? AddToCart : alertNotLoggedIn}>
                <i className="material-icons">add_shopping_cart</i>
            </button>
        </div>
    </div>
}

export default ProductItem