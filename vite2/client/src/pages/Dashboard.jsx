import React from "react";
import logoImage from "../../assets/human-athlete-motion-who-crosses-finish-line-breaks-ribbon-isolated-logo-vector-254768697.png"; 
import { Link } from "react-router-dom";
import Map from "../components/Map.jsx";
import SchedulingSection from "../components/schedulingSection.jsx";
import TeamFormation from "../components/TeamFormation.jsx";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
        <div style={{
  height: '55px',
  width: '55px',
  borderRadius: '30px',
  cursor: 'pointer',
  marginTop: '6px',
  transition: 'transform 1s ease-in-out',
}} className="logox mr-2" // Add margin-right to create space between logo and text
onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(360deg)'} 
onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
 >
  <img src={logoImage} alt="SportX Logo" className="h-full w-full rounded-full" />
</div>

          <div className="text-3xl font-bold">SportX</div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className=" text-xl font-bold hover:text-purple-300">Home</Link></li>
              <li><Link to="/nearby-stadiums" className=" text-xl font-bold hover:text-purple-300">Nearby Stadiums</Link></li>
              <li><Link to="/scheduling" className=" text-xl font-bold hover:text-purple-300">Scheduling</Link></li>
              <li><Link to="/team-formation" className=" text-xl font-bold hover:text-purple-300">Team Formation</Link></li>
              <li><Link to="/chat" className=" text-xl font-bold hover:text-purple-300">Chat</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section  style={{
            backgroundImage: "url('./assets/collage-several-athletes-playing-different-sports_978521-37145.avif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '40px',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center',
            paddingTop: '30vh',
            marginBottom: '20px',
            marginTop: '0px',
            height: '88vh',
          }} className="bg-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4 ">Connect, Play, and Enjoy Your Favorite Sport</h1>

        <p className="text-lg mb-6 ">Find players of similar skill level near you.</p>
        <button className="bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-300">
          Get Started
        </button>
      </section>

      {/* Popular Sports Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Popular Sports</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {["Soccer", "Tennis", "Badminton", "Volleyball", "Basketball", "Cricket"].map((sport, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-purple-800">{sport}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Section */}
      <section  className="mb-0">
      <hr className="my-4 h-1 bg-purple-400" />
          <h2 className="text-2xl font-bold text-center mb-2">Game Connect!!!!</h2>
          <p className="flex justify-center text-sm text-purple-900 font-bold mb-6">
            Find players of similar skill level to play with!
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <img 
              className="h-24 w-24 rounded-full border-2 border-purple-500" 
              src="https://cdn-icons-png.flaticon.com/512/16272/16272337.png" 
              alt="Player Icon 1"
            />
            <img 
              className="h-24 w-24 rounded-full border-2 border-purple-500" 
              src="https://cdn-icons-png.flaticon.com/512/16272/16272279.png" 
              alt="Player Icon 2"
            />
          </div>
          <div className="flex justify-center">
          <Link to="/match-swipe" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-pink-600 transition duration-300">
            Enter chatroom
          </Link>
          </div>
          <hr className=" mb-0 my-4 h-1 bg-purple-400" />
        </section>


      {/* Nearby Stadiums Section */}
      <section className="container mx-auto py-12 mt-0 relative z-10">
  <div className="bg-purple-200 p-4 rounded-lg shadow-md">
    <Map />
  </div>
</section>


<section><div>
  <SchedulingSection/></div></section>

  <section className="mt-10 mb-20">
    <div><TeamFormation/></div>
  </section>

      {/* Other Sports Section */}
      <section className="bg-purple-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Other Sports</h2>
          <p className="text-gray-600 mb-6">If your sport isn't listed, suggest it here!</p>
          <div className="flex justify-center gap-2">
            <input
              type="text"
              placeholder="Enter your sport..."
              className="px-4 py-2 border border-gray-300 rounded-lg w-64"
            />
            <button
              className="bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-900 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-800 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the SportX Community Today</h2>
        <p className="text-lg mb-6">Whether you're a casual player or a seasoned athlete, SportX helps you connect with sports enthusiasts around you.</p>
        <div className="mt-4">
  <a href="https://discord.gg/AWpEt2VB" target="_blank" rel="noopener noreferrer">
    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
      Join Now
    </button>
  </a>
</div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-6 text-center">
        <p>&copy; 2024 SportX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;