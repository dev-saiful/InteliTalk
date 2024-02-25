import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5001/api/v1";

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = response.data;

      // Store the token and user data in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to appropriate dashboard based on user role
      if (user.role === 'Student') {
        navigate('/student');
      } else if (user.role === 'Admin') {
        navigate('/admin');
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
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
