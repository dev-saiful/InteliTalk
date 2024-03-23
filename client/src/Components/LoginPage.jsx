import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

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

      // Set the token in the Axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redirect to appropriate dashboa;rd based on user role
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
    <div className="flex justify-center items-center h-screen">
        <form className='form flex justify-center flex-col' onSubmit={loginUser}>


          <div className='form-contents'>
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
          </div>

            {/* <!-- BUTTON --> */}
            <div>
                <button className="bg-orange-300 w-28 btn place-items-center" type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>

  );
};

export default LoginPage;
