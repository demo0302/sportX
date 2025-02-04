import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatRoom = ({ chatroomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("User");

  const socket = io("http://localhost:5000");

  // Join the chatroom
  useEffect(() => {
    socket.emit("joinChatroom", chatroomId);

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch initial chat messages from the database (optional)
    // You can fetch the last 10 messages or all messages in the chatroom from MongoDB

  }, [chatroomId]);

  const handleMessageSend = () => {
    if (newMessage.trim()) {
      const messageData = {
        username,
        text: newMessage,
        chatroomId,
      };

      // Emit message to the server
      socket.emit("sendMessage", messageData);

      // Clear message input field
      setNewMessage("");
    }
  };

  return (
    <div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.username}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
