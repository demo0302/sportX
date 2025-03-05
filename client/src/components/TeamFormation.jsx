import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import emailjs from "emailjs-com";

const TeamFormation = () => {
  const [teamName, setTeamName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [teamSize, setTeamSize] = useState(5);
  const [members, setMembers] = useState([]);
  const [player, setPlayer] = useState("");
  const [email, setEmail] = useState(""); // Team captain's email

  const sendEmail = (toEmail, matchDetails) => {
    emailjs
      .send(
        "service_202k32o",
        "template_asprx8p",
        {
          to_email: toEmail,
          subject: "Team Match Found!",
          message: `Your team ${matchDetails.teamName} has been matched with another team for ${matchDetails.sport}. Prepare for the game!`
        },
        "MO3CMgrzv941cwEPK"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  const handleAddPlayer = () => {
    if (player && members.length < teamSize) {
      setMembers([...members, player]);
      setPlayer("");
    }
  };

  const handleSubmit = async () => {
    if (!teamName || !selectedSport || members.length !== teamSize || !email) {
      alert("Please complete all fields and ensure your team has the required number of players.");
      return;
    }

    try {
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("selectedSport", "==", selectedSport));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchedTeam = querySnapshot.docs[0]; 
        const matchedData = matchedTeam.data();

        sendEmail(email, matchedData);
        sendEmail(matchedData.email, matchedData);

        await deleteDoc(doc(db, "teams", matchedTeam.id));

        alert("Match found! Check your email for details.");
      } else {
        await addDoc(teamsRef, {
          teamName,
          selectedSport,
          teamSize,
          members,
          email,
          createdAt: new Date(),
        });

        alert("No immediate match found. We will notify you when a match is available.");
      }

      setTeamName("");
      setSelectedSport("");
      setMembers([]);
      setEmail("");
    } catch (error) {
      console.error("Error forming team:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-xl text-gray-800 bg-purple-200"  >
      <h2 className="text-3xl font-semibold text-center mb-6 text-purple-600">Team Formation</h2>

      <input
        className="w-full p-2 mb-4 border rounded-lg"
        type="text"
        placeholder="Enter Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
      />

      <select
        className="w-full p-2 mb-4 border rounded-lg"
        value={selectedSport}
        onChange={(e) => setSelectedSport(e.target.value)}
        required
      >
        <option value="">Select a Sport</option>
        <option value="Football">Football</option>
        <option value="Basketball">Basketball</option>
        <option value="Cricket">Cricket</option>
      </select>

      <input
        className="w-full p-2 mb-4 border rounded-lg"
        type="email"
        placeholder="Enter Team Captain's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full p-2 mb-4 border rounded-lg"
        type="number"
        min="2"
        max="10"
        value={teamSize}
        onChange={(e) => setTeamSize(parseInt(e.target.value))}
        required
      />

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded-lg"
          type="text"
          placeholder="Enter Player Name"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-pink-500"
          onClick={handleAddPlayer}
        >
          Add
        </button>
      </div>

      <button
        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-pink-500"
        onClick={handleSubmit}
      >
        Create Team
      </button>

      {members.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Team Members:</h3>
          <ul className="list-disc pl-5">
            {members.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamFormation;