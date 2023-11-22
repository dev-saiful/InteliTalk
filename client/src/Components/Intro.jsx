import React from "react";
import { Routes, Route } from "react-router-dom";
import GuestButton from "./GuestButton";
import "./Intro.css";
import StudentButton from "./StudentButton";

const Intro = () => {
  return (
    <div>
      <h1 className="font-extrabold text-4xl underline">InteliTalk</h1>
      <div id="box" className="w-4/5">
        <p className="note font-semibold text-lg">
          Welcome to the University Chatbot! How can I assist you today? Whether
          you have questions about courses, admission, campus facilities, or
          anything else related to the university, feel free to ask, and I'll
          provide you with the information you need.
        </p>

        <div className="student__btn">
          <Routes>
            <Route path="/student" element={<StudentButton />} />
            <Route path="/guest" element={<GuestButton />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Intro;
