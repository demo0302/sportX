import React from "react";
import { Link, useNavigate } from "react-router-dom";  
import "./style.css";
import logoImage from "./assets/human-athlete-motion-who-crosses-finish-line-breaks-ribbon-isolated-logo-vector-254768697.png"; 
import "./App.css";
import "./index.css";
import "./style2.css";

function Header() {
  const navigate = useNavigate();
  const user = localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header>
      <div>
        <img className="logox" src={logoImage} alt="SportX Logo" />
      </div>
      <div className="logo">
        <h1>sportX</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/nearby-stadiums">Nearby Stadiums</Link></li>
          <li><Link to="/scheduling">Scheduling</Link></li>
          <li><Link to="/team">Team Formation</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <>
            <Link to="/profile">
              <button className="profile">Profile</button>
            </Link>
            <button className="signup" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
