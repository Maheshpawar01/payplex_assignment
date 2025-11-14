import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Users, 
  Activity, 
  User, 
  Eye, 
  Trash2, 
  Home,
  UserCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  GraduationCap
} from 'lucide-react';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewProfile, setViewProfile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, meResponse] = await Promise.all([
        authAPI.getAllUsers(),
        authAPI.getMe(),
      ]);

      setUsers(usersResponse.data.users);
      setCurrentUser(meResponse.data.user);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await authAPI.deleteUser(userId);
        toast.success('User deleted successfully!');
        fetchData();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const isAdmin = currentUser?.role === 'admin';
  const activeUsers = users.filter(u => u.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className=" cursor-pointer flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl shadow-lg">
                <Home className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
                </h1>
                <p className="text-gray-600 text-sm">College Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl px-6 py-3 border-2 border-purple-200">
                <img
                  src={currentUser.profilePhoto}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-3 border-white shadow-lg"
                />
                <div>
                  <p className="font-bold text-gray-800">{currentUser.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full capitalize">
                      {currentUser.role}
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-semibold">Active</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Total Users</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{users.length}</p>
                <p className="text-xs text-gray-500 mt-1">Registered members</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-2xl">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Active Users</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{activeUsers}</p>
                <p className="text-xs text-gray-500 mt-1">Currently online</p>
              </div>
              <div className="bg-green-100 p-4 rounded-2xl">
                <Activity className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>

          {/* Inactive Users */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-red-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Inactive Users</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{inactiveUsers}</p>
                <p className="text-xs text-gray-500 mt-1">Offline members</p>
              </div>
              <div className="bg-red-100 p-4 rounded-2xl">
                <User className="w-10 h-10 text-red-600" />
              </div>
            </div>
          </div>

          {/* Students/Admins */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Roles</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{totalStudents}/{totalAdmins}</p>
                <p className="text-xs text-gray-500 mt-1">Students / Admins</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-2xl">
                <GraduationCap className="w-10 h-10 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Users className="w-7 h-7" />
              <span>{isAdmin ? 'All Users Management' : 'All Users Overview'}</span>
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              {isAdmin ? 'View and manage all registered users' : 'View all registered users in the system'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Profile</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {users.map((user) => {
                  const isCurrentUser = currentUser._id === user._id;
                  
                  return (
                    <tr 
                      key={user._id} 
                      className={`hover:bg-gray-50 transition-colors ${
                        isCurrentUser ? 'bg-purple-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          className="w-14 h-14 rounded-full border-3 border-purple-200 shadow-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          {isCurrentUser && (
                            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
                              YOU
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 text-xs font-bold rounded-full flex items-center space-x-1 w-fit ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                        }`}>
                          {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                          <span className="uppercase">{user.role}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.contact}</td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 text-xs font-bold rounded-full flex items-center space-x-2 w-fit ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800 border border-green-300' 
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            user.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                          }`}></div>
                          <span className="uppercase">{user.isActive ? 'Active' : 'Inactive'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setViewProfile(user)}
                            className=" cursor-pointer p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 hover:scale-110 transition-all duration-200 shadow-md"
                            title="View Full Profile"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {isAdmin && !isCurrentUser && (
                            <button
                              onClick={() => handleDeleteUser(user._id, user.name)}
                              className="cursor-pointer p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 hover:scale-110 transition-all duration-200 shadow-md"
                              title="Delete User"
                            >
                              <Trash2 className=" w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Profile Modal */}
{viewProfile && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto transform transition-all animate-slideUp">
      {/* Modal Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">User Profile</h3>
          <button
            onClick={() => setViewProfile(null)}
            className=" cursor-pointer text-white hover:bg-white/20 rounded-full p-1.5 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal Body */}
      <div className="p-6">
        <div className="text-center mb-4">
          <img
            src={viewProfile.profilePhoto}
            alt={viewProfile.name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-purple-200 shadow-lg mb-3 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{viewProfile.name}</h2>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              viewProfile.role === 'admin' 
                ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                : 'bg-blue-100 text-blue-800 border border-blue-300'
            }`}>
              {viewProfile.role.toUpperCase()}
            </span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
              viewProfile.isActive 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-gray-100 text-gray-600 border border-gray-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                viewProfile.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span>{viewProfile.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Mail className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
              <p className="text-sm text-gray-800 font-medium break-words">{viewProfile.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Phone className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase">Contact</p>
              <p className="text-sm text-gray-800 font-medium">{viewProfile.contact}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Calendar className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase">Date of Birth</p>
              <p className="text-sm text-gray-800 font-medium">
                {new Date(viewProfile.dob).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
              <p className="text-sm text-gray-800 font-medium break-words">{viewProfile.address}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setViewProfile(null)}
          className="mt-5 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          Close Profile
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Dashboard;