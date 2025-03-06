import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "../assets/human-athlete-motion-who-crosses-finish-line-breaks-ribbon-isolated-logo-vector-254768697.png";

const Header2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 to-indigo-800 text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="h-14 w-14 rounded-full cursor-pointer transform transition-transform duration-500 hover:rotate-180">
          <img src={logoImage} alt="SportX Logo" className="h-full w-full rounded-full" />
        </div>

        {/* Title */}
        <div className="text-3xl font-bold">SportX</div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Navigation */}
        <nav className={`md:flex md:items-center md:space-x-4 transition-all ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-4 text-center md:text-left">
            {["Home", "Sports", "Chat", "Scheduling", "Team Formation", "Stadiums", "Teams List", "Other"].map((item, index) => (
              <li key={index} className="py-2 md:py-0">
                <Link to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-lg font-bold hover:text-purple-300 block px-4">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header2;