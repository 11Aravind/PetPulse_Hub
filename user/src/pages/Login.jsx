import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import "./CSS/Login.css"
import { useEffect, useRef } from "react";
import { httpRequest } from "../API/api"
import { useDispatch } from "react-redux";
import { fetchAndStore } from "../Slice/userSlice"

export const Login = () => {
  const dispatch = useDispatch();
  const email = useRef("");
  const passsword = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const [previousUrl, setPreviousUrl] = useState("");
  const previousRoute = useSelector((state) => state.common.prvRoute);
  // console.log(previousRoute);
  const login = () => {
    const loginData = {
      "email": email.current.value,
      "password": passsword.current.value
    }
    httpRequest('post', 'api/user/login', loginData)
      .then((res) => {
        const id=localStorage.setItem("userId", JSON.stringify(res.user_id));
        dispatch(fetchAndStore(id));
       (previousRoute==="/" || previousRoute==="/signup")?navigate("/"):navigate("/cart")
      })
      .catch((error) =>
        console.log(error)
      );

  }

  return (

    <div className="login-container">
      <div className="mx-auto col-10 col-md-8 col-lg-4 loginBox">
        <h3 className="main-headding">Welcome to PetPulse Hub</h3>
        <p className="login-desc">The leading platform for pet lovers,sellers and buyers </p>
        <form>
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
              placeholder="Password"
              ref={passsword}
            // autoComplete="current-password"
            />
          </div>
          <div className="form-group txtBox-spacing">
            <button type="button" className="bigButton" onClick={login}>
              Log in
            </button>

          </div>
        </form>
        <small className="redirectLink">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </small>

      </div>
    </div>
  );
}
