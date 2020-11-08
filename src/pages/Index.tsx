import * as React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { addCart } from '../store/cart/actions'
import { RootState } from '../store';


export default function Index() {
    let [productList, setProductList] = React.useState<ProductDetails[] | null>([])
    React.useEffect(() => {
        Axios('/api/products/getAllProducts').then(response => {
            const { data } = response
            setProductList(data.productList)
        }).catch(err => {
            toast.error("Could not connect to the server.")
        })
    }, [])
    return (
        <div>
            <h1>Available Products</h1>
            <div className="productContainer">
                {
                    productList?.map((item) => {
                        return <Product key={item._id} id={item._id} name={item.name} price={item.price} brand={item.brand} />
                    })
                }
            </div>
        </div>
    )
}

const Product = (props: { id: string, name: string, image?: string, price: number, brand?: string }) => {
    const dummyImage = 'https://dummyimage.com/600x400/5a27a7/fff.png'
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const AddToCart = () => {
        dispatch(addCart({
            id: props.id,
            name: props.name,
            brand: props.brand,
            quantity: 1
        }))
        Axios({
            method: "POST",
            url: "/api/cart/addCart",
            data: {
                item: props.id,
                quantity: 1
            },
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then(resp => {
            toast.info("Item added to cart.")
        }).catch(err => {
            console.error(err.message)
            toast.error(err.message)
        })
    }

    return <div className="card">
        <div className="card-image" style={{
            backgroundImage: `url(${props.image || dummyImage})`
        }}>
        </div>
        <div className="card-meta">
            <h3>
                <Truncate lines={2} ellipsis="...">
                    {props.name}
                </Truncate>
            </h3>
            <p className="price">
                Rs. {props.price}/-
            </p>
        </div>
        <div className="card-footer">
            <p className="brand">
                <Link to={`/brand/${props.brand?.toString().toLowerCase() || 'no-brand'}`}>
                    <span className="brand-text">
                        <Truncate lines={1} ellipsis="...">
                            {props.brand || "No brand"}
                        </Truncate>
                    </span>
                </Link>
            </p>
            <button onClick={AddToCart}>
                <i className="material-icons">add_shopping_cart</i>
            </button>
        </div>
    </div>
}