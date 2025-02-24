import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./header";
import Hero from "./Hero";
import Dashboard from "./Dashboard";
import Login from "./component/Login"; // Updated path
import Signup from "./component/Signup"; // Updated path
import ChatRoom from "./ChatRoom";
import "./App.css";
import "./style2.css";
import "./index.css";

function App() {
  const user = localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <Header user={user} />
      <div className="App">
        <Routes>
          {/* Public Landing Page */}
          {user && <Route path="/" exact element={<Dashboard />} />}
          <Route path="/" element={<Hero user={user} />} />

          {/* Authentication Routes */}
          <Route path="/login" exact element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" exact element={user ? <Navigate to="/dashboard" /> : <Signup />} />


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
