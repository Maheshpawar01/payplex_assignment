import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Sparkles } from 'lucide-react';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    address: '',
    contact: '',
    dob: '',
    profilePhoto: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      
      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-0 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 -right-48 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl my-8">
        {/* Header */}
        <div className="text-center mb-8 animate-float">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className=" cursor-pointer text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/80">Join our college management system</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contact"
                  required
                  pattern="[0-9]{10}"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                  placeholder="9876543210"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                />
              </div>
            </div>

            {/* Address - Full Width */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Complete Address *
              </label>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none resize-none"
                placeholder="Enter your complete address"
              />
            </div>

            {/* Profile Photo - Optional */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Photo URL (Optional)
              </label>
              <input
                type="url"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                placeholder="https://example.com/photo.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for auto-generated avatar</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className=" cursor-pointer w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className=" cursor-pointer text-purple-600 font-semibold hover:text-purple-700 transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;