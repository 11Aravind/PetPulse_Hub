
import { Link } from "react-router-dom";
import "./CSS/Login.css"
import { useRef } from "react";
import { useState } from "react";
export const Signup = () => {
  const [message, setMessage] = useState("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  const showHideMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  const signUp = () => {
    if (password != confirmPassword) {
      showHideMessage("Enter same passsword");
    }
    else {
      const signupData = {
        "email": email,
        "password": password
      }
      console.log(signupData);
    }

  }
  return (
    <div className="login-container">
      <div className="mx-auto col-10 col-md-8 col-lg-4 loginBox">
        <h3 className="main-headding">Signup</h3>
        <p className="login-desc">Signup and join the pet community </p>

        <div className="errorMsg">{message}</div>
        <div className="form-group  txtBox-spacing">
          {/* <label for="username">E-mail</label> */}
          <input
            type="text"
            className="form-control username"
            id="username"
            ref={email}
            placeholder="Email"
          />
        </div>
        <div className="form-group  txtBox-spacing">
          {/* <label for="password">Password</label> */}
          <input
            type="password"
            className="form-control password"
            id="password"
            ref={password}
            placeholder="Password"
          />
        </div>
        <div className="form-group txtBox-spacing">
          {/* <label for="cpassword">Confirm Password</label> */}
          <input
            type="password"
            className="form-control password"
            id="cpassword"
            ref={confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group txtBox-spacing">
          <button type="submit" className="bigLoginBtn" onClick={signUp}>
            Signup
          </button>
        </div>
        <small className="redirectLink">
          Already have an Account ? <Link to="/login">Login</Link>
        </small>
        {/* </form> */}

      </div>
    </div>
  );
}

