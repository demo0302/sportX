import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "./style2.css";

function Chat() {
  const navigate = useNavigate();

  const handleEnterChat = () => {
    console.log("Navigating to /chat-room"); // Debugging Log
    navigate("/chat-room");
  };

  return (
    <section id="chat">
      <h2>Chat with Your Team</h2>
      <p>Discuss match details with your teammates.</p>
      <button className="chat-button" onClick={handleEnterChat}>
        Enter Chat Room
      </button>
    </section>
  );
}

export default Chat;
