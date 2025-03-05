import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Image from "../assets/collage-several-athletes-playing-different-sports_978521-37145.avif";
import logoImage from "../assets/human-athlete-motion-who-crosses-finish-line-breaks-ribbon-isolated-logo-vector-254768697.png";
import Map from "../components/Map.jsx";
import SchedulingSection from "../components/SchedulingSection.jsx";
import PopularSports from "../components/PopularSports.jsx";
import TeamFormation from "../components/TeamFormation.jsx";
import ScheduledGames from "../ScheduledGames.jsx";
import TeamsList from "../TeamsList.jsx";
import SuggestSport from "../components/SuggestSport.jsx";
import SpinningWheel from "../SpinningWheel.jsx";

const Dashboard = () => {
  const [showWheel, setShowWheel] = useState(false);

  // Refs for the sections
  const homeRef = useRef(null);
  const popularSportsRef = useRef(null);
  const chatRef = useRef(null);
  const schedulingRef = useRef(null);
  const teamFormationRef = useRef(null);
  const stadiumsRef = useRef(null);
  const scheduledGamesRef = useRef(null);
  const teamsListRef = useRef(null);
  const suggestSportRef = useRef(null);
  const callToActionRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-purple-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 to-indigo-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div
            style={{
              height: "55px",
              width: "55px",
              WebkitTextStroke: "2px black solid",
              borderRadius: "30px",
              cursor: "pointer",
              marginTop: "6px",
              transition: "transform 1s ease-in-out",
            }}
            className="logox mr-2"
            onMouseOver={(e) => (e.currentTarget.style.transform = "rotate(360deg)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
          >
            <img src={logoImage} alt="SportX Logo" className="h-full w-full rounded-full" />
          </div>

          <div className="text-3xl font-bold">SportX</div>
          <nav>
            <ul className="flex space-x-4 ml-4 ">
              <li>
                <button onClick={() => scrollToSection(homeRef)} className="text-lg font-bold hover:text-purple-300 ml-4">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(popularSportsRef)} className="text-lg font-bold hover:text-purple-300">
                   Sports
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(chatRef)} className="text-lg font-bold hover:text-purple-300">
                  Chat
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(schedulingRef)} className="text-lg font-bold hover:text-purple-300">
                  Scheduling
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(teamFormationRef)} className="text-lg font-bold hover:text-purple-300">
                  Team Formation
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(stadiumsRef)} className="text-lg font-bold hover:text-purple-300">
                  Stadiums
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(teamsListRef)} className="text-lg font-bold hover:text-purple-300">
                  Teams List
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(suggestSportRef)} className="text-lg font-bold hover:text-purple-300">
                  Other
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={homeRef} style={{ backgroundImage: `url(${Image})`, backgroundSize: "cover", backgroundPosition: "center", padding: "40px", color: "white", textAlign: "center", height: "88vh" }} className="bg-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4 pt-27 mt-9">Connect, Play, and Enjoy Your Favorite Sport</h1>
        <p className="text-xl mb-6">Find players of similar skill level near you.</p>
        <button onClick={() => setShowWheel(true)} className="bg-white text-purple-800 px-8 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-colors duration-300">
          Spin & Play
        </button>
      </section>

      {/* Render Spinning Wheel Modal */}
      {showWheel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <SpinningWheel onClose={() => setShowWheel(false)} />
          </div>
        </div>
      )}

      {/* Popular Sports Section */}
      <section ref={popularSportsRef} className="my-0 py-0 bg-purple-100">
        <PopularSports />
      </section>

      {/* Chat Section */}
      <section ref={chatRef} className="mb-0 mt-0 bg-purple-200 pt-5">
        <h2 className="text-2xl font-bold text-center mb-2">Game Connect!!!!</h2>
        <p className="flex justify-center text-sm text-purple-900 font-bold mb-6">Find players of similar skill level to play with!</p>
        <div className="flex justify-center space-x-4 mb-4">
          <img className="h-24 w-24 rounded-full border-2 border-purple-500" src="https://cdn-icons-png.flaticon.com/512/16272/16272337.png" alt="Player Icon 1" />
          <img className="h-24 w-24 rounded-full border-2 border-purple-500" src="https://cdn-icons-png.flaticon.com/512/16272/16272279.png" alt="Player Icon 2" />
        </div>
        <div className="flex justify-center pb-6">
          <Link to="/match-swipe" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-pink-600 transition duration-300">
            Enter chatroom
          </Link>
        </div>
      </section>

      {/* Scheduling Section */}
      <section ref={schedulingRef} className="pt-10 pb-10 bg-purple-100">
        <SchedulingSection />
      </section>

      {/* Team Formation Section */}
      <section ref={teamFormationRef} className="pt-20 pb-20 bg-purple-100">
        <div className="bg-purple-300 pt-9 pb-9">
          <TeamFormation />
        </div>
      </section>

      {/* Nearby Stadiums Section */}
      <section ref={stadiumsRef} className="container bg-purple-100 mx-auto py-0 mb-10 relative z-10">
        <div className="bg-purple-200 p-4 rounded-xl shadow-md">
          <Map />
        </div>
      </section>

      {/* Scheduled Games Section */}
      <section ref={scheduledGamesRef}>
        <div>
          <ScheduledGames />
        </div>
        <hr />
      </section>

      {/* Teams List Section */}
      <section ref={teamsListRef} className="pb-10">
        <div>
          <TeamsList />
        </div>
      </section>

      {/* Suggest a Sport Section */}
      <section ref={suggestSportRef} className="bg-purple-200 py-12">
        <SuggestSport />
      </section>

      {/* Call-to-Action Section */}
      <section ref={callToActionRef} className="bg-purple-400 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the SportX Community Today</h2>
        <p className="text-xl mb-6">Whether you're a casual player or a seasoned athlete, SportX helps you connect with sports enthusiasts around you.</p>
        <div className="mt-4">
          <a href="https://discord.gg/AWpEt2VB" target="_blank" rel="noopener noreferrer">
            <button className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-xl">Join Now</button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-500 text-white py-6 text-center">
        <p>&copy; 2024 SportX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
