import * as React from 'react';
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import logo from '../images/logo.png'
import { RootState } from '../store';

export default function Navbar() {
    const cart = useSelector((state: RootState) => state.cart)
    const user = useSelector((state: RootState) => state.user)

    const generateMenu = () => {
        if (user.token) {
            return <React.Fragment>
                <LinkComponent to="/cart" icon="shopping_cart" badge={cart.carts.length} />
                <LinkComponent to="/profile" icon="face" />
            </React.Fragment>
        }
        return <LinkComponent to="/login" icon="login" />
    }

    return <header>
        <nav>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="search">
                <div className="searchBox">
                    <label htmlFor="searchInput"><i className="material-icons">search</i></label>
                    <input type="text" id="searchInput" />
                </div>
            </div>
            <ul className="navigation">
                {
                    generateMenu()
                }
            </ul>
        </nav>
    </header>
}

const LinkComponent = (props: { to: string, icon: string, badge?: number }) => (
    <Link to={props.to} >
        <li>
            <i className="material-icons">{props.icon}</i>
            {props.badge ? <div className="badge">{props.badge}</div> : null}
        </li>
    </Link>
)