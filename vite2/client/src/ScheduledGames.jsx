import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ScheduledGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "matches"));
        const gameList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGames(gameList);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <section className="container mx-auto py-8 px-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">Upcoming Matches</h2>
      
      {games.length === 0 ? (
        <p className="text-center text-gray-600">No scheduled matches yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-purple-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{game.sport}</h3>
              <p><strong>Date:</strong> {game.date}</p>
              <p><strong>Time:</strong> {game.time}</p>
              <p><strong>Gender:</strong> {game.gender}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ScheduledGames;
