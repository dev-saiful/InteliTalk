import { useState } from "react";
import "./LoginPage.css";
// import { Link } from "react-router-dom";

const API_URL = "http://localhost:5001/api/v1";

const LoginPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    // Preventing auto-reload on submit
    e.preventDefault();

    try {
      const response = await postData(`${API_URL}/login`, data);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data successfully sent to the backend:", responseData);
      } else {
        console.log(
          "Failed to login user:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  const collectData = () => {
    console.log("clicked");
  };

  const postData = async (url, data) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(await postData.json);
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
          <label>password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button
          className="bg-orange-300 w-28 btn"
          type="submit"
          onClick={collectData}
        >
          Submit
        </button>
      </form>
      {/* <Link className="std-btn bg-green-300" to="/guest">
        <button>Guest</button>
      </Link> */}
    </div>
  );
};

export default LoginPage;
