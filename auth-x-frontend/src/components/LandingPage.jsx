import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold">
          Auth-<span className="text-blue-500">X</span> : A Complete Auth System
        </h1>
        
        <p className="text-gray-400 text-lg">
          A MERN stack authentication boilerplate that includes email verification and password reset features.
        </p>

        <div className="space-y-4 mt-12">
          <button
            onClick={() => navigate('/register')}
            className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Create Account
          </button>
          
          <p className="text-sm text-gray-400">
            By signing up, you agree to the{' '}
            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>

          <p className="text-gray-400 mt-6">Already have an account?</p>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full max-w-sm bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Login
          </button>
        </div>

        <div className="mt-16 text-gray-500 text-sm flex items-center justify-center gap-2">
          Made with <span className="text-red-500">❤</span> BHARATH YADAV
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
