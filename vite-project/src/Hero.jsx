import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import HowItWorks from "./HowItWorks";
import CallToAction from "./CallToAction";

function Hero({ user }) {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard"); // Redirect to Dashboard if logged in
    } else {
      navigate("/login"); // Redirect to Login if not logged in
    }
  };

  return (<section>
    <section className="hero">
      <div className="hero-text">
        <h2>Find Nearby Sports Enthusiasts</h2>
        <p>Connect, play, and enjoy your favorite sport with others near you.</p>
        <button className="cta" onClick={handleGetStarted}>Get Started</button>
       
      </div>
      
    </section>

    <section> <div> <HowItWorks/></div></section>
    <section> <div> <CallToAction /></div></section>
    
    </section>

  );
}

export default Hero;
