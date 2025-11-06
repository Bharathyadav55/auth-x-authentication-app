import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return navigate('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white">Auth-<span className="text-blue-400">X</span></h1>
                <p className="text-xs text-slate-400">Authentication Platform</p>
              </div>
            </div>
            
            {/* Profile Button */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                <div className="w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center font-bold text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.username}</span>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-slate-700 rounded-xl shadow-2xl border border-slate-600 overflow-hidden">
                  <div className="p-5 border-b border-slate-600 bg-slate-800">
                    <p className="text-xs text-slate-400 mb-2">Signed in as</p>
                    <p className="font-semibold text-white truncate text-sm">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-4 hover:bg-slate-600 text-red-400 hover:text-red-300 transition font-medium flex items-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Welcome Section */}
        <div className="mb-16 lg:mb-20">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl px-8 lg:px-12 py-12 lg:py-16 shadow-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Welcome back, <span className="text-blue-100">{user.username}!</span>
            </h2>
            <p className="text-blue-100 text-lg lg:text-xl">Your account is fully authenticated and secure</p>
          </div>
        </div>

        {/* Stats Cards Grid - FIXED SPACING */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 lg:mb-20">
          {/* Card 1: Profile */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 lg:p-10 hover:border-slate-600 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition">
                <span className="text-4xl">👤</span>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Account Profile</h3>
            <p className="text-slate-400 text-base mb-6 leading-relaxed">Manage your personal information and settings</p>
            <button className="text-blue-400 hover:text-blue-300 text-base font-semibold transition">View Profile →</button>
          </div>

          {/* Card 2: Security */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 lg:p-10 hover:border-slate-600 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition">
                <span className="text-4xl">🔐</span>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Security Settings</h3>
            <p className="text-slate-400 text-base mb-6 leading-relaxed">Update passwords and security preferences</p>
            <button className="text-blue-400 hover:text-blue-300 text-base font-semibold transition">Manage Security →</button>
          </div>

          {/* Card 3: Activity */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 lg:p-10 hover:border-slate-600 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition">
                <span className="text-4xl">⚙️</span>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Preferences</h3>
            <p className="text-slate-400 text-base mb-6 leading-relaxed">Customize your experience and preferences</p>
            <button className="text-blue-400 hover:text-blue-300 text-base font-semibold transition">Configure →</button>
          </div>
        </div>

        {/* Profile Information Card - FIXED SPACING */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 lg:p-12 mb-16 lg:mb-20 shadow-xl">
          <div className="mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-4">
              <span className="text-4xl">📋</span>
              Profile Information
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 mb-10">
            {/* Username */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest">Username</label>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg px-6 py-4 text-white font-semibold text-lg">
                {user.username}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest">Email Address</label>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg px-6 py-4 text-white font-semibold text-lg break-all">
                {user.email}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest">Account Status</label>
              <div className="bg-green-500/20 border border-green-500/40 rounded-lg px-6 py-4 text-green-400 font-bold text-lg flex items-center gap-3">
                <span className="text-2xl">✓</span> Verified & Active
              </div>
            </div>

            {/* Member Since */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest">Member Since</label>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg px-6 py-4 text-white font-semibold text-lg">
                {new Date(user.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-10"></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
              Edit Profile
            </button>
            <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 text-lg">
              Change Password
            </button>
          </div>
        </div>

        {/* Features Section - FIXED SPACING */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 lg:p-12 shadow-xl">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 flex items-center gap-4">
            <span className="text-4xl">⭐</span>
            Auth-X Features
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-slate-500 transition">
              <div className="flex gap-5">
                <span className="text-5xl">📧</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg">Email Verification</h4>
                  <p className="text-slate-400 text-base leading-relaxed">Your email has been verified with OTP for security</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-slate-500 transition">
              <div className="flex gap-5">
                <span className="text-5xl">🔐</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg">JWT Authentication</h4>
                  <p className="text-slate-400 text-base leading-relaxed">Secure token-based authentication system</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-slate-500 transition">
              <div className="flex gap-5">
                <span className="text-5xl">🔑</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg">Password Reset</h4>
                  <p className="text-slate-400 text-base leading-relaxed">Secure password recovery and reset options</p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-slate-500 transition">
              <div className="flex gap-5">
                <span className="text-5xl">🛡️</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg">CORS Enabled</h4>
                  <p className="text-slate-400 text-base leading-relaxed">Safe cross-origin requests for APIs</p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-slate-500 transition">
              <div className="flex gap-5">
                <span className="text-5xl">⚡</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg">Fast & Reliable</h4>
                  <p className="text-slate-400 text-base leading-relaxed">Built on modern tech stack for performance</p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-slate-500 transition">
              <div className="flex gap-5">
                <span className="text-5xl">🔄</span>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg">Session Management</h4>
                  <p className="text-slate-400 text-base leading-relaxed">Secure session handling with cookies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 lg:mt-20 pt-10 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-base">
            Made with <span className="text-red-500">❤</span> by HARSHIT X CODES
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
