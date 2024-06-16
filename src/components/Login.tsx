import { UserContext } from '@/contexts/UserContext';
import { Profile, ApiResponse } from '@/types';
import axiosInstance from '@/utils/axios-config';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useContext(UserContext);

  if (!userContext) {
    console.error('UserContext is undefined');
    return null;
  }

  const { setUser } = userContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance<ApiResponse<Profile>>({
        method: 'post',
        url: '/auth/login',
        data: { username, password },
      });

      const { message, data } = response.data;

      if (message === 'success') {
        localStorage.setItem('token', data.access_token);
        setUser(data.user);
        const from =
          (location.state as { from: Location })?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Failed to login: ', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              用户名
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              密码
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
