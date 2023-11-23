import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Intro from "./Components/Intro";

function App() {
  return (
    <Router>
      <div id="main">
        <Intro />
      </div>
    </Router>
  );
}

export default App;
