import { useState } from "react";
import "./StudentButton.css";

const StudentButton = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const eventHandler = () => {
    console.log("student clicked");
  };

  return (
    <div>
      <button
        id="btn1"
        className="bg-cyan-400 text-black font-bold h-12 w-24 rounded-full"
        onClick={eventHandler}
      >
        Student
      </button>
      <p className="test">hello</p>
    </div>
  );
};

export default StudentButton;
