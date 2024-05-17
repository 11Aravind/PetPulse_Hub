import { Link } from "react-router-dom";
import { useNavigate ,useLocation} from "react-router";
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

  // useEffect(() => {
  //   // Save the previous URL when the location changes
  //   const previousUrl = localStorage.getItem("previousUrl");
  //   setPreviousUrl(previousUrl || "/");
  
  //   console.log(previousUrl);
  // }, []);
  const login = () => {
    const loginData = {
      "email": email.current.value,
      "password": passsword.current.value
    }
    httpRequest('post', 'api/user/login', loginData)
      .then((res) =>{ 
        dispatch(fetchAndStore(res.user_id));
        // if (previousUrl.includes("/productdetails/")) {
        //   // If the previous URL was a product details page
        //   navigate(previousUrl);
        // } else {
        //   // Default navigation if the previous URL doesn't match a specific condition
        //   navigate("/");
        // }
    
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
