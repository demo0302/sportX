import React from "react";
import { useNavigate } from "react-router-dom";

function ChatRoom() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to the Chat Room</h2>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default ChatRoom;
