import React from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import "./style.css";
import logoImage from "./assets/human-athlete-motion-who-crosses-finish-line-breaks-ribbon-isolated-logo-vector-254768697.png"; 
import sideimg from "./assets/boy.png";
import { auth } from './component/firebase'; // Adjust the import based on your file structure
import "./App.css";
import "./index.css";
import "./style2.css";
function Header({ user }) {
  const handleLogout = () => {
    auth.signOut(); // Sign out the user
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
          <li><Link to="#scheduling">Scheduling</Link></li>
          <li><Link to="#team">Team Formation</Link></li>
          <li><Link to="#chat">Chat</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <>
            <Link to="/profile">
              <button className="profile" >Profile</button>
            </Link>
            <button className="signup" onClick={handleLogout} >Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login" >Login</button>
            </Link>
            <Link to="/register">
              <button className="signup" >Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;