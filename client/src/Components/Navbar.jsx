import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-black">
        <div className="flex bg-black items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              className="text-2xl bg-black font-extrabold text-cyan-400 italic"
              to="/"
            >
              InteliTalk
            </Link>
          </div>
          <div className="flex bg-black space-x-4">
            <Link
              to="/chat"
              className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Guest
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
