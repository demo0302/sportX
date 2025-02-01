import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Done() {
  const navigate = useNavigate(); // Import useNavigate hook

  const handleGetStarted = () => {
    navigate("/dashboard"); // Navigate to the dashboard or any other route you want
  };

  return (
    <section className="hero" >
      <div className="hero-text">
      <h2
          style={{
            fontSize: "100px",
            fontWeight: "bold",
            letterSpacing: "4px",
            marginBottom: "20px",
            textShadow: "4px 4px 6px rgba(0, 0, 0, 1)", // Add shadow to make it pop
          }}
        >
          Welcome to SportX
        </h2>
        <h1 style={{color:"white"}}>Game Connect!!!! Find players of similar skill level to play with!</h1>
          </div>
    </section>
  );
}

export default Done;
