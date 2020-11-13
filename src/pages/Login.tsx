import Axios from "axios";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { logIn } from "../store/user/actions";

import "../styles/login.css";

interface LoginProps {
  isRegister: boolean;
}

export default function Login(props: LoginProps) {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const history = useHistory<History>();

  const dispatch = useDispatch<Dispatch>();

  const { isRegister } = props;

  const logUserIn = (token: string) => {
    localStorage.setItem("token", token);
    dispatch(logIn(token));
  };

  const attemptLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    setErrorMsg("");

    Axios({
      method: "POST",
      url: "/api/user/login",
      data: {
        email,
        password,
      },
    })
      .then((resp) => {
        const { data } = resp;
        logUserIn(data.token);
        history.replace("./");
      })
      .catch((err) => {
        setErrorMsg("Invalid Credentials");
      });
  };
  const attemptRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef?.current?.value;
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    setErrorMsg("");

    Axios({
      method: "POST",
      url: "/api/user/register",
      data: {
        name,
        email,
        password,
        role: "user",
      },
    })
      .then((resp) => {
        history.replace("./login", );
      })
      .catch((err) => {
        alert(err.message);
        setErrorMsg("Unable to perform the action. Could not process the provided data.")
      });
  };

  return (
    <div className="login">
      <div className="login-form">
        <h3>{isRegister ? "Register" : "Log in"}</h3>
        <form onSubmit={isRegister ? attemptRegister : attemptLogin}>
          {isRegister ? (
            <div className="inputGroup">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Jack Dawson"
                autoComplete="on"
                autoFocus={isRegister}
                required
                ref={nameRef}
              />
            </div>
          ) : null}

          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jack@titanic.com"
              autoComplete="email"
              autoFocus={!isRegister}
              required
              ref={emailRef}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="jacKlovEsroSe*1912$"
              autoComplete="off"
              autoFocus={false}
              required
              ref={passwordRef}
            />
          </div>
          <div className="error-message">
            <small>{errorMsg}</small>
          </div>
          <button type="submit">{isRegister ? "Register" : "Log in"}</button>
        </form>
        <div className="links">
          {!isRegister ? (
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          ) : (
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
