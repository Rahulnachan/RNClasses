import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import { motion } from "framer-motion";
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  BookOpenIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import { fetchUserProfile, updateUserProfile } from "../api/api";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phoneNumber: "",
    profileImage: ""
  });
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await fetchUserProfile();
      console.log("Profile response:", response);
      
      // Handle response structure
      const profileData = response.data || response;
      setProfile(profileData);
      
      // Initialize edit form
      setEditForm({
        name: profileData.name || "",
        phoneNumber: profileData.phoneNumber || "",
        profileImage: profileData.profileImage || ""
      });
      
      setError("");
    } catch (err) {
      console.error("Error loading profile:", err);
      setError(err.response?.data?.error || "Failed to load profile");
      
      // If 401, redirect to login
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = () => {
    document.getElementById('photo-upload-input').click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('token');
      
      // ✅ FIXED: Changed from '/api/users/' to '/api/user/'
      const response = await axios.post(
        'http://localhost:8085/api/user/upload-profile-photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.imageUrl) {
        // Update profile with new image
        setProfile({ ...profile, profileImage: response.data.imageUrl });
        setEditForm({ ...editForm, profileImage: response.data.imageUrl });
        toast.success('Profile photo updated successfully!');
        
        // Optionally update AuthContext
        if (user) {
          user.profileImage = response.data.imageUrl;
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error.response?.data?.error || 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
      // Clear file input
      event.target.value = '';
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      setEditForm({
        name: profile?.name || "",
        phoneNumber: profile?.phoneNumber || "",
        profileImage: profile?.profileImage || ""
      });
    }
    setIsEditing(!isEditing);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      const response = await updateUserProfile(editForm);
      console.log("Update response:", response);
      
      if (response.success) {
        setSuccess("Profile updated successfully!");
        // Refresh profile data
        await loadProfile();
        setIsEditing(false);
      } else {
        setError(response.error || "Update failed");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.error || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const memberSince = profile?.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'N/A';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-white">Your Personal Dashboard</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                My Profile
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Manage your personal information and account settings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Profile Header with User Info */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Profile Photo with Camera Icon */}
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                    {profile?.profileImage ? (
                      <img 
                        src={profile.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      profile?.name?.charAt(0) || user?.name?.charAt(0) || 'U'
                    )}
                  </div>
                  {/* Camera Icon - CLICKABLE */}
                  <button
                    onClick={handlePhotoUpload}
                    disabled={uploadingPhoto}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingPhoto ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                    ) : (
                      <CameraIcon className="w-4 h-4 text-purple-600" />
                    )}
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profile?.name || user?.name || 'User'}</h2>
                  <p className="text-blue-100 flex items-center mt-1">
                    <ShieldCheckIcon className="w-4 h-4 mr-1" />
                    {profile?.role || user?.role || 'STUDENT'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                className="flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
              >
                {isEditing ? (
                  <>
                    <XMarkIcon className="w-5 h-5 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            id="photo-upload-input"
            accept="image/jpeg,image/png,image/gif,image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
            >
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg"
            >
              <p className="text-green-700">{success}</p>
            </motion.div>
          )}

          {/* Profile Content */}
          <div className="p-8">
            {isEditing ? (
              /* Edit Mode */
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="flex items-center space-x-6 mb-6 p-6 bg-gray-50 rounded-xl">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                      {editForm.profileImage ? (
                        <img 
                          src={editForm.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        editForm.name?.charAt(0) || profile?.name?.charAt(0) || 'U'
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      {uploadingPhoto ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                      ) : (
                        <CameraIcon className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Profile Photo</h3>
                    <p className="text-sm text-gray-500">Click the camera icon to update your photo</p>
                    <p className="text-xs text-gray-400 mt-1">Max size: 5MB | Formats: JPG, PNG, GIF</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={profile?.email || ''}
                        disabled
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Email address cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={editForm.phoneNumber}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Role
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile?.role || 'STUDENT'}
                        disabled
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <CheckIcon className="w-5 h-5 mr-2" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                  >
                    <XMarkIcon className="w-5 h-5 mr-2" />
                    Cancel
                  </button>
                </div>
              </motion.form>
            ) : (
              /* View Mode */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 text-center">
                    <CalendarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date().getFullYear() - (profile?.createdAt ? new Date(profile.createdAt).getFullYear() : 2024)}+
                    </p>
                    <p className="text-sm text-gray-600">Years Active</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 text-center">
                    <BookOpenIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <p className="text-sm text-gray-600">Courses Enrolled</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 text-center">
                    <ChartBarIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                    <p className="text-sm text-gray-600">Avg. Progress</p>
                  </div>
                </div>

                {/* Profile Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-gray-900">Personal Information</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Full Name</span>
                        <span className="text-base font-medium text-gray-900">{profile?.name || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Email Address</span>
                        <span className="text-base font-medium text-gray-900">{profile?.email || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-500">Phone Number</span>
                        <span className="text-base font-medium text-gray-900">{profile?.phoneNumber || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-gray-900">Account Details</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Role</span>
                        <span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            profile?.role === 'ADMIN' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {profile?.role || 'STUDENT'}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Member Since</span>
                        <span className="text-base font-medium text-gray-900">{memberSince}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-500">Account Status</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                      to="/my-courses"
                      className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 text-left"
                    >
                      <BookOpenIcon className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">My Courses</p>
                      <p className="text-xs text-gray-500">View your enrolled courses</p>
                    </Link>
                    
                    <Link
                      to="/student-dashboard"
                      className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 text-left"
                    >
                      <ChartBarIcon className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">Dashboard</p>
                      <p className="text-xs text-gray-500">Check your progress</p>
                    </Link>
                    
                    <Link
                      to="/courses"
                      className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 text-left"
                    >
                      <AcademicCapIcon className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">Browse Courses</p>
                      <p className="text-xs text-gray-500">Find new courses to learn</p>
                    </Link>
                    
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 text-left"
                    >
                      <ArrowRightOnRectangleIcon className="w-8 h-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">Logout</p>
                      <p className="text-xs text-gray-500">Sign out of your account</p>
                    </button>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="text-center">
                  <button
                    onClick={handleEditToggle}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;