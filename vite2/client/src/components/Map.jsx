import { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import { initializeSocket, getSocket } from "../socket/socket.client";
import useLocalStorage from "../stadium/useLocalStorage";
import useGeolocation from "../stadium/useGeolocation";

export default function Map() {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef([]); // Store marker references
  const [loading, setLoading] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [filterSport, setFilterSport] = useState("All");
  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", { latitude: 0, longitude: 0 });
  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage("NEARBY_MARKERS", []);
  const location = useGeolocation();

  const stadiums = [
      {
        _id: "67c40baa09934067e715c8b4",
        name: "Jawaharlal Nehru Stadium",
        address: "India Gate, Central Secretariat, New Delhi, Delhi 110001",
        sports_available: ["Cricket", "Football", "Athletics", "Multi-sport events"],
        facilities: ["Parking", "Locker rooms", "Cafeteria", "Medical facilities"],
        contact_details: "Not specified",
        opening_hours: "Not specified",
        location: { latitude: 28.6129, longitude: 77.2295 },
      },
      {
        _id: "67c40bf809934067e715c8b6",
        name: "Chhatrasal Stadium",
        address: "Model Town, Delhi 110009",
        sports_available: ["Wrestling", "Athletics"],
        facilities: ["Training areas", "Seating", "Gymnasium"],
        contact_details: "Not specified",
        opening_hours: "Not specified",
        location: { latitude: 28.6619, longitude: 77.202 },
      },
      {
        _id: "67c40bf809934067e715c8b7",
        name: "Thyagraj Stadium",
        address: "Thyagraj Nagar, New Delhi, Delhi 110014",
        sports_available: ["Indoor sports", "Athletics"],
        facilities: ["Indoor arena", "Seating", "Locker rooms"],
        contact_details: "Not specified",
        opening_hours: "Not specified",
        location: { latitude: 28.585, longitude: 77.227 },
      },
      {
        _id: "67c40bf809934067e715c8b8",
        name: "Chilla Sports Complex",
        address: "Village Dallupura, Vasundhara Enclave, Delhi 110096",
        sports_available: ["Cricket", "Football", "Badminton"],
        facilities: ["Training facilities", "Open grounds", "Parking"],
        contact_details: "81782 37839",
        opening_hours: "Not specified",
        location: { latitude: 28.57, longitude: 77.295 },
      },
      {
        _id: "67c40bf809934067e715c8b9",
        name: "Jaypee Integrated Sports Complex",
        address: "Greater Noida, Uttar Pradesh 201308",
        sports_available: ["Cricket", "Football", "Tennis", "Badminton"],
        facilities: ["Parking", "Locker rooms", "Cafeteria", "Gym"],
        contact_details: "Not specified",
        opening_hours: "Not specified",
        location: { latitude: 28.485, longitude: 77.487 },
      },
      {
        _id: "67c40bf809934067e715c8ba",
        name: "ISKATE",
        address: "Sector 29, Gurgaon, Haryana 122001",
        sports_available: ["Ice skating", "Roller skating"],
        facilities: ["Skating rink", "Cafeteria", "Parking"],
        contact_details: "Not specified",
        opening_hours: "Not specified",
        location: { latitude: 28.4669, longitude: 77.0733 },
      },
      {
        _id: "67c40bf809934067e715c8bb",
        name: "Sardar Patel Stadium",
        address: "Sardar Patel Stadium, Ahmedabad, Gujarat 380001",
        sports_available: ["Cricket"],
        facilities: ["Parking", "Locker rooms", "Cafeteria"],
        contact_details: "Not specified",
        opening_hours: "Not specified",
        location: { latitude: 23.058, longitude: 72.578 },
      },
      {
        _id: "67c40bf809934067e715c8bc",
        name: "Feroz Shah Kotla Ground",
        address: "Feroz Shah Kotla, New Delhi, Delhi 110002",
        sports_available: [],
        facilities: [],
        contact_details: "Not specified",
        opening_hours: "Not specified",
        location: { latitude: 28.6139, longitude: 77.2275 },
      },
    


  ];

  useEffect(() => {
    initializeSocket("67c52bd8a79ded92cf6d128c");
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map("map").setView([userPosition.latitude, userPosition.longitude], 13);
      leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(mapRef.current);
      console.log("Map initialized"); // Debugging
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    setLoading(false);
    setUserPosition(location);

    if (userMarkerRef.current) mapRef.current.removeLayer(userMarkerRef.current);
    userMarkerRef.current = leaflet.marker([location.latitude, location.longitude], {
      icon: leaflet.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
        iconSize: [30, 30],
      }),
    }).addTo(mapRef.current).bindPopup("You are here");
    mapRef.current.setView([location.latitude, location.longitude]);
  }, [location]);

  // Function to clear old markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (marker && mapRef.current.hasLayer(marker)) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = []; // Reset array
  };

  const addMarkers = () => {
    if (!mapRef.current) return;
  
    clearMarkers(); // Remove old markers before adding new ones
  
    if (showMarkers) {
      console.log("Adding markers..."); // Debugging
      console.log("Stadiums:", stadiums); // Debugging
  
      stadiums.forEach((stadium) => {
        const { latitude, longitude } = stadium.location || { latitude: 0, longitude: 0 }; // Fix: Access stadium.location
        const { name, sports_available, facilities, address } = stadium;
  
        if (filterSport === "All" || sports_available.includes(filterSport)) {
          console.log(`Adding marker for ${name} at (${latitude}, ${longitude})`); // Debugging
          const marker = leaflet
            .marker([latitude, longitude], {
              icon: leaflet.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/128/3237/3237472.png",
                iconSize: [30, 30],
              }),
            })
            .addTo(mapRef.current)
            .bindPopup(
              `<b>${name}</b><br>
               Address: ${address}<br>
               Sports Available: ${sports_available.join(", ")}<br>
               Facilities: ${facilities.join(", ")}`
            );
          markersRef.current.push(marker);
        }
      });
    }
  };
  
  useEffect(() => {
    addMarkers(); // Update markers when filter or visibility changes
  }, [nearbyMarkers, showMarkers, filterSport]);

  return (
    
    <div className="flex flex-col items-center justify-center space-y-4 p-4 bg-gray-100 min-h-screen">
      <h1 className='mt-1 pt-1 text-center text-3xl font-extrabold text-purple-800'>Nearby Stadium</h1>
      {loading && <p className="text-lg font-semibold text-pink-500">Loading location...</p>}
      <div className="flex space-x-4">
        <button 
          className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => setUserPosition(location)}
        >
          Refresh Location
        </button>

        <button 
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => setShowMarkers(!showMarkers)}
        >
          {showMarkers ? "Hide Markers" : "Show Markers"}
        </button>

        <select 
          className="px-4 py-2 border rounded-lg shadow-md bg-white"
          onChange={(e) => setFilterSport(e.target.value)}
        >
          <option value="All">All Sports</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Athletics">Athletics</option>
          <option value="Badminton">Badminton</option>
          <option value="Tennis">Tennis</option>
          <option value="Ice skating">Ice Skating</option>
          <option value="Roller skating">Roller Skating</option>
          <option value="Wrestling">Wrestling</option>
          <option value="Indoor sports">Indoor Sports</option>
        </select>
      </div>

      <div id="map" className="h-[500px] w-full max-w-4xl rounded-lg shadow-lg border"></div>
    </div>
  );
}