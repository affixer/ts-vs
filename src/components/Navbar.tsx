import * as React from 'react';
import { Link } from 'react-router-dom'

import logo from '../images/logo.png'


export default function Navbar(props: { page: string }) {
    return <header>
        <nav>
            <div className="logo">
                <a href="/">
                    <img src={logo} alt="logo" />
                </a>
            </div>
            <div></div>
            <ul className="navigation">
                <LinkComponent to="/cart" name="Cart" />
                <LinkComponent to="/login" name="Login" />
            </ul>
        </nav>
    </header>
}


const LinkComponent = (props: { to: string, name?: string }) => (<li><Link to={props.to} >{props.name ? props.name : props.to}</Link></li>)