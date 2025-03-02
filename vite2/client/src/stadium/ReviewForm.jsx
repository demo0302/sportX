import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ stadiumId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmitReview = async () => {
    try {
      await axios.post("/api/reviews", { stadiumId, review, rating });
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Write a review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
      />
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-16 p-2 border border-gray-300 rounded-lg mb-2"
      />
      <button
        onClick={handleSubmitReview}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;