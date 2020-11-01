import * as React from 'react';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Index from './pages/Index';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/Navbar';

import './styles/common.css'

export default function App() {
    return <React.Fragment>
        <Router>
            <Navbar page="index" />
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    </React.Fragment>
}