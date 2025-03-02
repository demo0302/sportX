import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="text-white hover:underline">
            Nearby Stadiums
          </Link>
        </li>
        <li>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;



