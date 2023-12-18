import { useState } from "react";
import "./LoginPage.css";
// import { Link } from "react-router-dom";

const registerUser = (e) => {
  //removing auto reload on submit
  e.preventDefault();
};

const LoginPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div>
      <form onSubmit={registerUser}>
        <div className="inputs">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            placeholder="name"
            required
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
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
        <button className="bg-orange-300 w-28 btn" type="submit">
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
