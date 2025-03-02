import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const StadiumMap = ({ stadiums, userLocation }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stadiums.map((stadium) => (
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
  );
};

export default StadiumMap;