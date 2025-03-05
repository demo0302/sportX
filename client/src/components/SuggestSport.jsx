import { useState } from "react";

const SuggestSport = () => {
	const [sport, setSport] = useState("");
	const [suggestions, setSuggestions] = useState([]); // Stores submitted sports

	const handleSubmit = (e) => {
		e.preventDefault();
		if (sport.trim()) {
			// Correctly updating state using the previous state
			setSuggestions((prevSuggestions) => [...prevSuggestions, sport]);
			setSport(""); // Clear input after submission
		}
	};

	return (
		<div className="flex flex-col items-center pt-9 bg-purple-200 pb-8">
			<div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
				<h2 className="text-xl font-bold text-gray-800 mb-4">Other Sports</h2>
				<p className="text-gray-600 mb-2">If your sport isn't listed, suggest it here!</p>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-3">
					<input
						type="text"
						placeholder="Enter your sport..."
						value={sport}
						onChange={(e) => setSport(e.target.value)}
						className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
					<button
						type="submit"
						className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-150"
					>
						Submit
					</button>
				</form>

				{/* Display the submitted suggestions */}
				{suggestions.length > 0 && (
					<div className="mt-4">
						<h3 className="text-lg font-semibold text-gray-800">Submitted Sports:</h3>
						<ul className="text-gray-600 mt-2">
							{suggestions.map((item, index) => (
								<li key={index} className="border-b py-1">{item}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default SuggestSport;
