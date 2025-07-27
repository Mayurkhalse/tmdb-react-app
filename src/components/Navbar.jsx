import React from "react";
import Logo from "../movielogo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex items-center space-x-8 border pl-3 py-4">
      <img className="w-[50px]" src={Logo} alt="logo" />
      <Link to="/" className="text-blue-500 text-3xl font-bold">
        Movies
      </Link>

      <Link to="/watchlist" className="text-blue-500 text-3xl font-bold">
        Watchlist
      </Link>
    </div>
  );
};

export default Navbar;
