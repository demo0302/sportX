import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import emailjs from "emailjs-com";

const SchedulingSection = () => {
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const sendEmail = (toEmail, matchDetails) => {
    emailjs
      .send(
        "service_202k32o",
        "template_asprx8p",
        {
          to_email: toEmail,
          subject: "Game Matched!",
          message: `Your game has been scheduled with another player for ${matchDetails.sport} on ${matchDetails.date} at ${matchDetails.time}.`
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check for an existing match
      const matchesRef = collection(db, "matches");
      const q = query(
        matchesRef,
        where("sport", "==", sport),
        where("date", "==", date),
        where("gender", "==", gender)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Match found! Notify both players and remove from pending list
        const matchedGame = querySnapshot.docs[0]; 
        const matchedData = matchedGame.data();

        sendEmail(email, matchedData); // Notify current user
        sendEmail(matchedData.email, matchedData); // Notify matched user

        // Remove matched entry from database
        await deleteDoc(doc(db, "matches", matchedGame.id));

        alert("Match found! Check your email for details.");
      } else {
        // No match found, add a new entry
        await addDoc(matchesRef, {
          sport,
          date,
          time,
          gender,
          email,
          createdAt: new Date(),
        });

        alert("No immediate match found. We will notify you when a match is available.");
      }

      // Reset form
      setSport("");
      setDate("");
      setTime("");
      setGender("");
      setEmail("");
    } catch (error) {
      console.error("Error scheduling game:", error);
    }
  };

  return (
    <section className="container mx-auto py-12 px-6 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-900">Schedule a Game</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-purple-800 font-semibold mb-2">Choose Sport:</label>
          <select
            className="w-full p-3 border border-purple-300 rounded-lg"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
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

        <div>
          <label className="block text-purple-800 font-semibold mb-2">Select Date:</label>
          <input
            type="date"
            className="w-full p-3 border border-purple-300 rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-purple-800 font-semibold mb-2">Provide Email</label>
          <input
            type="email"
            className="w-full p-3 border border-purple-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-purple-800 font-semibold mb-2">Select Time:</label>
          <input
            type="time"
            className="w-full p-3 border border-purple-300 rounded-lg"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        

        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700"
          >
            Find a Match
          </button>
        </div>
      </form>
    </section>
  );
};

export default SchedulingSection;
