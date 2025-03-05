import React, { useState } from "react";

const SpinningWheel = ({ onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");

  const sports = [
    "Football",
    "Basketball",
    "Cricket",
    "Hockey",
    "Tennis",
    "Badminton",
    "Indoor Games"
  ];

  const startSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      const randomSport = sports[Math.floor(Math.random() * sports.length)];
      setSelectedSport(randomSport);
    }, 1000);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-center p-9 ml-6 mr-6 bg-purple-200 rounded-lg shadow-lg">
      <p className="text-2xl font-bold mb-4">Spin the Wheel!</p>
      <div
  className={`w-64 h-64 rounded-full border-4 border-purple-600 flex items-center justify-center transition-transform duration-100 ${
    isSpinning ? "animate-spin" : ""
  }`}
  onClick={startSpin}
  style={{ fontSize: '5rem', cursor: 'pointer' }} // Adjust the font size of the emoji
>
  🎡
</div>
      <p className="mt-4 text-lg text-gray-700">Tap to spin</p>
      {!isSpinning && selectedSport && (
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold">You got: {selectedSport}!</p>
          <button
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-pink-700 transition duration-300"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinningWheel;