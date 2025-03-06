import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header2 from "../components/Header2.jsx";
import Image from "../assets/collage-several-athletes-playing-different-sports_978521-37145.avif";
import Map from "../components/Map.jsx";
import SchedulingSection from "../components/Section.jsx";
import PopularSports from "../components/PopularSports.jsx";
import TeamFormation from "../components/TeamFormation.jsx";
import ScheduledGames from "../ScheduledGames.jsx";
import TeamsList from "../TeamsList.jsx";
import SuggestSport from "../components/SuggestSport.jsx";
import SpinningWheel from "../SpinningWheel.jsx";

const Dashboard = () => {
  const [showWheel, setShowWheel] = useState(false);

  // Section Refs
  const sectionRefs = {
    Home: useRef(null),
    Sports: useRef(null),
    Chat: useRef(null),
    Scheduling: useRef(null),
    "Team Formation": useRef(null),
    Stadiums: useRef(null),
    "Teams List": useRef(null),
    Other: useRef(null),
  };

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 overflow-hidden">
      {/* Header */}
      <Header2 scrollToSection={scrollToSection} sectionRefs={sectionRefs} />

      {/* Hero Section */}
      <section
        ref={sectionRefs.Home}
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          color: "white",
          height: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="bg-purple-600 text-white"
      >
        <h1 className="text-4xl font-bold mb-4">Connect, Play, and Enjoy Your Favorite Sport</h1>
        <p className="text-xl mb-6">Find players of similar skill level near you.</p>
        <button
          onClick={() => setShowWheel(true)}
          className="bg-white text-purple-800 px-8 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-colors duration-300"
        >
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
      <section ref={sectionRefs.Sports} className="my-0 py-0 bg-purple-100">
        <PopularSports />
      </section>


    {/* Chat Section */}
    <section ref={sectionRefs.Chat} className="mb-0 mt-0 bg-purple-200 pt-5">
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
  <div className="flex justify-center pb-6">
    <Link
      to="/match-swipe"
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-pink-600 transition duration-300"
    >
      Enter chatroom
    </Link>
  </div>
</section>






      {/* Scheduling Section */}
      <section ref={sectionRefs.Scheduling} className="pt-10 pb-10 bg-purple-100">
        <SchedulingSection />
      </section>

      {/* Team Formation Section */}
      <section ref={sectionRefs["Team Formation"]} className="pt-20 pb-20 bg-purple-100">
        <div className="bg-purple-300 pt-9 pb-9">
          <TeamFormation />
        </div>
      </section>

      {/* Nearby Stadiums Section */}
      <section ref={sectionRefs.Stadiums} className="container bg-purple-100 mx-auto py-0 mb-10 relative z-10">
        <div className="bg-purple-200 p-4 rounded-xl shadow-md">
          <Map />
        </div>
      </section>

      {/* Scheduled Games Section */}
      <section ref={sectionRefs["Teams List"]}>
        <div>
          <ScheduledGames />
        </div>
        <hr />
      </section>

      {/* Teams List Section */}
      <section ref={sectionRefs["Teams List"]} className="pb-10">
        <TeamsList />
      </section>

      {/* Suggest a Sport Section */}
      <section ref={sectionRefs.Other} className="bg-purple-200 py-12">
        <SuggestSport />
      </section>

      {/* Footer */}
      <footer className="bg-purple-500 text-white py-6 text-center">
        <p>&copy; 2024 SportX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
