import "./LoginPage.css";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div>
      <form action="">
        <div className="inputs">
          <label for="email">Email:</label>
          <input type="email" id="email" required />
        </div>

        <div className="inputs">
          <label for="password">password:</label>
          <input type="password" id="password" />
        </div>
        <button className="bg-orange-300 w-28 btn"> Submit</button>
      </form>
      {/* <Link className="std-btn bg-green-300" to="/guest">
        <button>Guest</button>
      </Link> */}
    </div>
  );
};

export default LoginPage;
