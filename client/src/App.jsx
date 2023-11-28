import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Intro from "./Components/Intro";
import StudentButton from "./Components/StudentButton";
import GuestButton from "./Components/GuestButton";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />}>
        <Route path="/student" element={<StudentButton />} />
        <Route path="/guest" element={<GuestButton />} />
      </Route>
    </Routes>
  );
}

export default App;
