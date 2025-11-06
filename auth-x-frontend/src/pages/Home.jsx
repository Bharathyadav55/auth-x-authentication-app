import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setLoginOpen(false);
    navigate('/dashboard');
  };

  const handleSignupSuccess = () => {
    setSignupOpen(false);
    navigate('/verify-email');  // ← Redirect to verification
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
  <div className="max-w-2xl w-full text-center space-y-14">

    {/* Header Section */}
    <div className="space-y-5">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
        Auth-<span className="text-blue-500">X</span> : A Complete Auth System
      </h1>
      
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
        A MERN stack authentication boilerplate that includes email verification
        and password reset features.
      </p>
    </div>

    {/* CTA Section */}
    <div className="space-y-7">

      <button
        onClick={() => setSignupOpen(true)}
        className="w-full sm:w-80 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg shadow-blue-900/30 transition duration-300"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-400 px-6 leading-relaxed">
        By signing up, you agree to the{" "}
        <a href="#" className="text-blue-500 hover:text-blue-400 underline">Terms of Service</a> and{" "}
        <a href="#" className="text-blue-500 hover:text-blue-400 underline">Privacy Policy</a>
      </p>

      <p className="text-gray-400 text-sm">Already have an account?</p>

      <button
        onClick={() => setLoginOpen(true)}
        className="w-full sm:w-80 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg shadow-gray-900/40 transition duration-300"
      >
        Login
      </button>

    </div>

    {/* Footer */}
    <div className="flex flex-col items-center gap-4 pt-10">
      <div className="text-gray-400 text-sm flex items-center gap-2">
        Made BY <span className="text-red-500 text-lg">❤</span> BHARATH YADAV
      </div>

      <div className="flex justify-center gap-8 text-xs text-gray-500 border-t border-gray-800 pt-4">
        <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
        <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
        <a href="#" className="hover:text-gray-300 transition">Help Center</a>
      </div>
    </div>
  </div>

      <LoginModal 
        isOpen={loginOpen} 
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
      <SignupModal 
        isOpen={signupOpen} 
        onClose={() => setSignupOpen(false)}
        onSuccess={handleSignupSuccess}  // ← Pass this function
      />
  </div>
  );

}

export default Home;
