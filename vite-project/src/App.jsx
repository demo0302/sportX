import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./header";
import Hero from "./Hero";
import Dashboard from "./Dashboard";
import Login from "./component/Login";
import Register from "./component/Register";
import ChatRoom from "./ChatRoom"; // Import the ChatRoom component
import { auth } from "./component/firebase";
import "./App.css";
import "./style2.css";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header user={user} />
      <div className="App">
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Hero user={user} />} />

          {/* Authentication Routes */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/chat-room" element={user ? <ChatRoom /> : <Navigate to="/login" />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
