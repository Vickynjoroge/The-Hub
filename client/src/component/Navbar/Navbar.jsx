
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
// import image from "../assests/Moringa-logo.png";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }

  const handleSignupClick = () => {
    // Navigate to the "/signup" route
    navigate('/login');
  };
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img src="https://images-platform.99static.com/RZ3fF_e4-HRMP6-d_o_3zjHACp4=/500x500/top/smart/99designs-contests-attachments/57/57132/attachment_57132482" alt="Moringa Logo" />
          </Link>
        </div>
        <div>
          {user ? (
            <div className="navbar-menu1">
              <h1>Welcome, {user.username}!</h1>
              <button onClick={handleLogoutClick}>Logout</button>
            </div>
          ) : (
            <div className="navbar-menu">
              <Link to="/our_hub">Our Hub</Link>
              <Link to="/events">Events</Link>
              <button className="btn btn-outline-secondary" onClick={handleSignupClick}>JOIN OUR NETWORK</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;

