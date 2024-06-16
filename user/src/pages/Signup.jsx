import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setRoute } from "../Slice/commonSlice"
import { httpRequest } from "../API/api"
import "./CSS/Login.css"

export const Signup = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [passwordLength, setErrorMsg] = useState(" ")
  const [isValid, setIsValid] = useState(false);
  const [samePassword, setMsg] = useState(" ")
  const [message, setMessage] = useState("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showHideMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  const checkPasswordLength = (e) => {
    const currentValue = e.target.value;
    if (currentValue.length < 6) {
      setErrorMsg("Password length must be >=6 ");
    }
    else if (confirmPassword.current.value !== "") {
      checkPasswordMatch()
    }
    else {
      setErrorMsg("")
    }
  }
  const checkPasswordMatch = () => {
    if (password.current.value != confirmPassword.current.value) {
      setMsg("Enter same passsword")
    }
    else
      setMsg("")
  }
  const validateEmail = (e) => {
    const email = e.target.value
    // Regular expression pattern for a valid email address
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(pattern.test(email) ? "" : "Enter valid e-mail");
  };
  const signUp = () => {
    const signupData = {
      "email": email.current.value,
      "password": password.current.value
    }
    httpRequest('post', 'api/user/signup', signupData)
      .then((res) => {
        dispatch(setRoute("/signup"))
        navigate("/login")
      })
      .catch((err) =>  {
        showHideMessage("Something went wrong try again")
      console.log(err);
      });
  }


  return (
    <div className="login-container">
      {userId === null ? <div className="mx-auto col-10 col-md-8 col-lg-4 loginBox">
        <h3 className="main-headding">Signup</h3>
        <p className="login-desc">Signup and join the pet community </p>
        <div className="errorMsg">{message}</div>
        <div className="form-group  txtBox-spacing">
          <input
            type="text"
            className="form-control username"
            id="username"
            ref={email}
            placeholder="Email"
            onChange={validateEmail}
          />
          <small className="errorMsg">{isValid}</small>
        </div>
        <div className="form-group  txtBox-spacing">
          <input
            type="password"
            className="form-control password"
            id="password"
            ref={password}
            onChange={e => checkPasswordLength(e)}
            placeholder="Password"
          />
          <small className="errorMsg">{passwordLength}</small>
        </div>
        <div className="form-group txtBox-spacing">
          <input
            type="password"
            className="form-control password"
            id="cpassword"
            ref={confirmPassword}
            onChange={checkPasswordMatch}
            placeholder="Confirm Password"
          />
          <small className="errorMsg">{samePassword}</small>
        </div>
        <div className="form-group txtBox-spacing">
          <button type="submit"
            className={(passwordLength.length === 0 && samePassword.length === 0 && isValid.length === 0) ? "bigButton" : "bigButton disabled"}
            onClick={signUp} disabled={(passwordLength.length === 0 && samePassword.length === 0 && isValid.length === 0) ? false : true}>
            Signup
          </button>
        </div>
        <small className="redirectLink">
          Already have an Account ? <Link to="/login">Login</Link>
        </small>
      </div> : <h1>You are already login</h1>}
    </div>
  );
}

