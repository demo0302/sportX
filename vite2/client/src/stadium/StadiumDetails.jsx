import React from "react";

const StadiumDetails = ({ stadium }) => {
  return (
    <div>
      <h3 className="font-bold">{stadium.name}</h3>
      <p>{stadium.address}</p>
      <p><strong>Facilities:</strong> {stadium.facilities.join(", ")}</p>
      <p><strong>Contact:</strong> {stadium.contact}</p>
      <p><strong>Opening Hours:</strong> {stadium.openingHours}</p>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${stadium.lat},${stadium.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Get Directions
      </a>
    </div>
  );
};

export default StadiumDetails;