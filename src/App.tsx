import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Index from './pages/Index';
import Cart from './pages/Cart';
import Login from './pages/Login';

import Navbar from './components/Navbar';

import 'react-toastify/dist/ReactToastify.css'
import './styles/common.css'
import { useDispatch } from 'react-redux';
import { logIn } from './store/user/actions';

export default function App() {
    const dispatch = useDispatch()
    React.useEffect(() => {
        const token = localStorage.getItem("token")
        if (token)
            dispatch(logIn(token))
    }, [dispatch])
    return <React.Fragment>
        <Router>
            <Navbar />
            <div className="application">
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" >
                        <Login isRegister />
                    </Route>
                </Switch>
            </div>
        </Router>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </React.Fragment>
}