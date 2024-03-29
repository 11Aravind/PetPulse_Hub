import { Link } from "react-router-dom";
import "./CSS/Login.css"
export const Login = () => {
  return (

    <div className="login-container">
      <div className="mx-auto col-10 col-md-8 col-lg-4 loginBox">
        <form className="form-example" action="" method="post">
          <h3 className="main-headding">Welcome to PetPulse Hub</h3>
          <p className="login-desc">The leading platform for pet lovers,sellers and buyers </p>
          <div className="form-group txtBox-spacing">
            {/* <label for="username">E-mail</label> */}
            <input
              type="text"
              className="form-control username"
              id="username"
              placeholder="Email"
            />
          </div>
          <div className="form-group txtBox-spacing">
            {/* <label for="password">Password</label> */}
            <input
              type="password"
              className="form-control password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group txtBox-spacing">
            <button type="submit" className="bigLoginBtn">
              Log in
            </button>
          </div>
          <small className="redirectLink">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </small>
        </form>

      </div>
    </div>
  );
}
