import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold">
          Welcome to Auth-<span className="text-blue-500">X</span>
        </h1>
        
        <div className="bg-gray-900 rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Hello, {user?.username}!</h2>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-green-500">✓ Email Verified</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
