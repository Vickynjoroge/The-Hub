import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


const Login = ( {setUser} ) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    async function login(){
      const response = await fetch(`/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        setIsLoading(false);
        const user = await response.json();
        setUser(user);
        navigate('/posts')
      } else {
        const err = await response.json();
        setErrors(err.message || "Invalid Username or Password");
      }
    }
    login();
  };


  return (
    <div className="login-page">
      <div className="login-outer-card">
        {/* <div className="logo-container">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo-image" />
        </div> */}
        <div className="login-inner-card">
          <div className="login-left-section">
            <h1>Welcome back! <br/>The Hub</h1>
            <p className="login-subtext">
              Login to Continue
            </p>
            {errors && <p className="login-error-text">{errors}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-secondary btn-lg" type="submit">
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
            <p className="login-signup-text">
              New to The Hub?{" "}
              <Link to="/signup" className="signup-link">
                Create an account
              </Link>
              <br />
              It takes less than a minute.
            </p>
          </div>
          <div className="login-right-section">
            <img
              src="https://images-platform.99static.com/RZ3fF_e4-HRMP6-d_o_3zjHACp4=/500x500/top/smart/99designs-contests-attachments/57/57132/attachment_57132482"
              alt="Login"
              className="login-image"
            />
          </div>
        </div>
        <p className="login-bottom-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;