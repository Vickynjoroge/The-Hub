import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUp({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    if (name.trim() === "") {
      setErrors(["Please enter a name"]);
      setIsLoading(false);
      return;
    }

    if (password !== password_confirmation) {
      setErrors(["Passwords do not match"]);
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrors(["Please enter a valid email"]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, zipcode, password}),
      });

      setIsLoading(false);

      if (response.ok) {
        const data = await response.json();
        // Assuming you want to set the user after successful sign-up
        setUser(data.user);
        navigate("/login");
      } else {
        const err = await response.json();
        setErrors([err.message || "Invalid Username or Password"]);
      }
    } catch (error) {
      setErrors(["An error occurred during signup. Please try again."]);
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="signup-page">
      <div className="signup-outer-card">
        <div className="signup-inner-card">
          <h1>Welcome to The Hub</h1>
          <p className="signup-subtext">Sign up now!</p>

          <div className="signup-form-container">
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </form>
            <div className="signup-separator"></div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="zipcode">Zipcode</label>
                <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    id="phone_number"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    id="password_confirmation"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="new-password"
                    required
                />
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
          </div>

          <p className="signup-login-text">
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


