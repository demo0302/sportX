
const searchBar=()=>{
  const [searchQuery, setSearchQuery] = useState("");

const filteredStadiums = stadiums.filter((stadium) =>
  stadium.name.toLowerCase().includes(searchQuery.toLowerCase())
);
return (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Nearby Stadiums</h2>
    <input
      type="text"
      placeholder="Search stadiums..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
    />
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredStadiums.map((stadium) => (
          <Marker key={stadium.id} position={[stadium.lat, stadium.lng]}>
            <Popup>
              <div>
                <h3 className="font-bold">{stadium.name}</h3>
                <p>{stadium.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </div>
);}

export default searchBar;