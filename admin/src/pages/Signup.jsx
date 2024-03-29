import { Link } from "react-router-dom";

export const Signup=()=>{
    return(
      <div className="topSpacing">
        <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form>
            <div className="formbold-form-title">
              <h2 className="">SIGN UP</h2>
            </div>
            <div className="formbold-mb-3">
              <input placeholder="Username"
              id="Username"
                type="text"  className="formbold-form-input"
              />
            </div>
            <div className="formbold-mb-3">
              <input placeholder="E-mail"
                type="email"
                className="formbold-form-input"
              />
            </div>
  
            <div className="formbold-mb-3">
              <input type="password" className="formbold-form-input"   placeholder="Password"/>
            </div>
  
            <button className="formbold-btn">SIGN UP</button>
  <small className="redirect">Already have an Account ? <Link to="/login">Sign In</Link></small>
          </form>
        </div>
      </div>    
      </div>
    );
}
