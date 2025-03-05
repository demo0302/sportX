import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const TeamsList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "teams"));
        const teamList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeams(teamList);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="container mx-auto py-8 px-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">Team Formations</h2>
      
      {teams.length === 0 ? (
        <p className="text-center text-gray-600">No teams formed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-blue-800 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{team.teamName}</h3>
              <p><strong>Sport:</strong> {team.selectedSport}</p>
              <p><strong>Members:</strong></p>
              <ul className="list-disc pl-4">
                {team.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeamsList;
