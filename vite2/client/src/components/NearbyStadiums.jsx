import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";

// Fix for default Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const NearbyStadiums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sportType: "",
    maxDistance: 5000, // Default 5km
  });
  const [userLocation, setUserLocation] = useState([28.6139, 77.209]); // Default to Delhi
  const [showMap, setShowMap] = useState(false);
  const [stadiums, setStadiums] = useState([]);

  // Fetch stadiums from the backend
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/stadiums", {
          params: {
            search: searchQuery,
            sportType: filters.sportType,
            maxDistance: filters.maxDistance,
            latitude: userLocation[0],
            longitude: userLocation[1],
          },
        });
        setStadiums(data);
      } catch (error) {
        console.error("Error fetching stadiums:", error);
      }
    };

    fetchStadiums();
  }, [searchQuery, filters, userLocation]);

  // Filter stadiums based on search and filters
  const filteredStadiums = stadiums.filter((stadium) => {
    const matchesSearch = stadium.stadium_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSportType = filters.sportType
      ? stadium.sports_available.includes(filters.sportType)
      : true;
    return matchesSearch && matchesSportType;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nearby Stadiums</h2>
      <button
        onClick={() => setShowMap(!showMap)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        {showMap ? "Hide Map" : "Show Map"}
      </button>

      <input
        type="text"
        placeholder="Search stadiums..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />

      <div className="flex gap-4 mb-4">
        <select
          value={filters.sportType}
          onChange={(e) => setFilters({ ...filters, sportType: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Sports</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Tennis">Tennis</option>
        </select>
        <input
          type="range"
          min="1000"
          max="10000"
          value={filters.maxDistance}
          onChange={(e) => setFilters({ ...filters, maxDistance: e.target.value })}
          className="w-48"
        />
        <span>{filters.maxDistance / 1000} km</span>
      </div>

      {showMap && (
        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredStadiums.map((stadium) => (
              <Marker
                key={stadium._id}
                position={[stadium.location.coordinates[1], stadium.location.coordinates[0]]}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{stadium.stadium_name}</h3>
                    <p>{stadium.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {filteredStadiums.map((stadium) => (
        <div key={stadium._id} className="mt-4">
          <h3 className="font-bold">{stadium.stadium_name}</h3>
          <p>{stadium.address}</p>
        </div>
      ))}
    </div>
  );
};

export default NearbyStadiums;