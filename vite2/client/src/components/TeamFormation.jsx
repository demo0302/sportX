import { useState } from "react";
import { motion } from "framer-motion";

const TeamFormation = () => {
  const [teamName, setTeamName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [teamSize, setTeamSize] = useState(5);
  const [members, setMembers] = useState([]);
  const [player, setPlayer] = useState("");

  const handleAddPlayer = () => {
    if (player && members.length < teamSize) {
      setMembers([...members, player]);
      setPlayer("");
    }
  };

  return (
    <motion.div
      className="container mx-auto p-8 bg-purple-600 text-white rounded-lg shadow-2xl max-w-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Team Formation</h2>

      {/* Team Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Team Name:</label>
        <input
          type="text"
          className="w-full p-2 rounded-lg border border-gray-300 text-black"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </div>

      {/* Sport Selection */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Choose Sport:</label>
        <select
          className="w-full p-2 rounded-lg border border-gray-300 text-black"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          required
        >
          <option value="">Select a Sport</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Badminton">Badminton</option>
          <option value="Cricket">Cricket</option>
        </select>
      </div>

      {/* Team Size */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Team Size:</label>
        <input
          type="number"
          className="w-full p-2 rounded-lg border border-gray-300 text-black"
          min="2"
          max="10"
          value={teamSize}
          onChange={(e) => setTeamSize(parseInt(e.target.value))}
          required
        />
      </div>

      {/* Add Players */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Add Players:</label>
        <div className="flex space-x-2">
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 text-black"
            placeholder="Enter player name"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          />
          <button
            onClick={handleAddPlayer}
            className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Team Members List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Team Members:</h3>
        <ul className="bg-purple-700 p-4 rounded-lg shadow-md">
          {members.length === 0 ? (
            <p className="text-gray-300">No members added yet.</p>
          ) : (
            members.map((member, index) => (
              <li key={index} className="py-1">
                {index + 1}. {member}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-purple-500 py-2 rounded-lg font-bold hover:bg-purple-600 transition">
        Create Team
      </button>
    </motion.div>
  );
};

export default TeamFormation;
