import React from "react";
import "./GuestButton.css";

const GuestButton = () => {
  const eventHanlder = () => {
    console.log("guest clicked");
  };

  return (
    <div>
      {/* all the class is from tailwind */}
      <button
        id="btn2"
        className="bg-cyan-400 text-black font-bold h-12 w-24 rounded-full"
        onClick={eventHanlder}
      >
        Login as a guest
      </button>
    </div>
  );
};

export default GuestButton;
