import * as React from "react";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import Navbar from "./components/Navbar";

import "react-toastify/dist/ReactToastify.css";
import "./styles/common.css";

// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "./store/user/actions";
import { addCart } from "./store/cart/actions";

// import { RootState } from "./store";
// import io from "socket.io-client";

interface CartFromServer {
  item: string;
  quantity: number;
}

export default function App() {
//   const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

//   React.useEffect(() => {
//       if (!token) return
//       const socket = io({ query: { token }});
//       socket.once("connected", () => {
//         console.log(socket.connected);
//         toast.info("Connected!!!!!")
//       });
    
//       socket.on("notification", (data: string) => {
//         toast.info(data);
//       });
    
//       socket.on("cart-items", (data: any) => {
//         toast.info(`Cart Items: ${data.cartItems}`);
//       });
//   }, [token])


  React.useEffect(() => {
    const getCartDetails = (token: string) => {

      console.log(token);
      
      
      Axios({
        method: "GET",
        url: "/api/cart/getCartItems",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          const { cartItems } = resp.data;
          if (cartItems.length) {
            cartItems.forEach((cart: CartFromServer) => {
              Axios({
                method: "GET",
                url: `/api/products/getProduct/${cart.item}`,
              })
                .then((res) => {
                  const { product } = res.data;
                  return dispatch(
                    addCart({
                      id: cart.item,
                      name: product.name,
                      brand: product.brand,
                      quantity: cart.quantity,
                      price: product.price,
                    })
                  );
                })
                .catch((err) => console.log(err.message));
            });
          }
        })
        .catch((err) => {
          toast.error("There was a problem fetching data from server.");
        });
    };
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(logIn(token));
      getCartDetails(token);
    }
  }, [dispatch]);
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className="application">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register">
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
  );
}
