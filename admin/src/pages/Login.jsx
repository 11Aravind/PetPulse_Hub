import { useRef } from "react";
import {useNavigate} from  "react-router";
import {httpRequest} from "../API/api.js"
import "./CSS/Login.css"
export const Login = () => {
  const navigate=useNavigate()
  const emailRef=useRef(null)
  const passwordRef=useRef(null)
  const signin=()=>{
    const data={
      "email":emailRef.current.value,
     "password":passwordRef.current.value
    }
    httpRequest('post','api/admin/login',data)
    .then((res)=>{
      console.log(res)
      navigate("/")
    })
    .catch((err)=>console.log(err))
  }
  return (
    <div className="topSpacing content-div">
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
            <div className="formbold-form-title">
              <h2 className="">SIGN IN</h2>
            </div>
            <div className="formbold-mb-3">
              <input placeholder="E-mail"
                type="email"
                className="formbold-form-input"
                ref={emailRef}
              />
            </div>
            <div className="formbold-mb-3">
              <input type="password" className="formbold-form-input" placeholder="Password"
              ref={passwordRef} />
            </div>
            <div className="formbold-mb-3">
              <button className="formbold-btn" onClick={signin}>SIGN IN</button>
            </div>
        </div>
      </div>
    </div>
  );
}
