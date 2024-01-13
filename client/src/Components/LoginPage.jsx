import { useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const API_URL = "http://localhost:5001/api/v1";

const LoginPage = () => {
  // const history = useHistory(); 
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, data);

      if (response.status === 200) {
        console.log("Data successfully sent to the backend:");
        // history.push("/chat");
      } else {
        console.log("Failed to login user:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <div className="inputs">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="inputs">
          <label>Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button className="bg-orange-300 w-28 btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
