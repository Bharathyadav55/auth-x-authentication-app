import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    // Only allow numbers and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await verifyEmail(code);
      if (response.success) {
        setSuccess('Email verified successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">
            Verify Your <span className="text-blue-500">Email</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Enter the 6-digit verification code sent to your email
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 pt-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-lg text-center animate-pulse">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-lg text-center animate-pulse">
              {success}
            </div>
          )}

          {/* Input Field */}
          <div className="space-y-3">
            <input
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="Enter Verification Code"
              maxLength="6"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 text-center text-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition tracking-widest font-semibold"
            />
            <p className="text-sm text-gray-500 text-center">
              {code.length}/6 digits entered
            </p>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-center gap-8 text-xs text-gray-500 pt-8 border-t border-gray-800">
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
          <a href="#" className="hover:text-gray-300 transition">Help Center</a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
