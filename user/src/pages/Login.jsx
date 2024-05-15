import { Link } from "react-router-dom";
import "./CSS/Login.css"
import { useEffect, useRef } from "react";
import {httpRequest} from "../API/api"
export const Login = () => {
  const email = useRef("");
  const passsword = useRef("");

  const login = () => {
    const loginData = {
      "email": email.current.value,
      "password": passsword.current.value
    }
    httpRequest('post','api/user/login', loginData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (

    <div className="login-container">
      <div className="mx-auto col-10 col-md-8 col-lg-4 loginBox">
          <h3 className="main-headding">Welcome to PetPulse Hub</h3>
          <p className="login-desc">The leading platform for pet lovers,sellers and buyers </p>
          <div className="form-group txtBox-spacing">
            {/* <label for="username">E-mail</label> */}
            <input
              type="text"
              className="form-control username"
              id="username"
              placeholder="Email"
              ref={email}
            />
          </div>
          <div className="form-group txtBox-spacing">
            {/* <label for="password">Password</label> */}
            <input
              type="password"
              className="form-control password"
              id="password"
              placeholder="Password"
              ref={passsword}
            />
          </div>
          <div className="form-group txtBox-spacing">
            <button type="button" className="bigButton" onClick={login}>
              Log in
            </button>

          </div>
          <small className="redirectLink">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </small>

      </div>
    </div>
  );
}
