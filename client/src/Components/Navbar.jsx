import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-center">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-evenly">
          <div className="title text-white">
            <Link
              className="text-2xl font-extrabold text-cyan-400 italic"
              to="/"
            >
              InteliTalk
            </Link>
          </div>
          <div className="links space-x-4">
            <Link
              to="/guest"
              className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Geust
            </Link>
            <Link
              to="/login"
              className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
