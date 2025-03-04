import { useState } from "react";

const SchedulingSection = () => {
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Scheduled: ${sport} on ${date} at ${time} (${gender} preference)`);
  };

  return (
    <section className="container mx-auto py-12 px-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-900">Schedule a Game</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sport Selection */}
        <div>
          <label className="block text-purple-800 font-semibold mb-2">Choose Sport:</label>
          <select
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
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

        {/* Date Picker */}
        <div>
          <label className="block text-purple-800 font-semibold mb-2">Select Date:</label>
          <input
            type="date"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Time Picker */}
        <div>
          <label className="block text-purple-800 font-semibold mb-2">Select Time:</label>
          <input
            type="time"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* Gender Preference */}
        <div>
          <label className="block text-purple-800 font-semibold mb-2">Gender Preference:</label>
          <select
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender Preference</option>
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Find a Match
          </button>
        </div>

      </form>
    </section>
  );
};

export default SchedulingSection;