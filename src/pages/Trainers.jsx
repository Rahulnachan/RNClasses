import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLinkedin, 
  FaTwitter, 
  FaGithub, 
  FaGlobe,
  FaEnvelope,
  FaStar,
  FaUsers,
  FaBookOpen,
  FaAward,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSpinner
} from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";

function Trainers() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await API.get('/trainer/all');
      console.log('Trainers response:', response.data);
      
      if (response.data.success) {
        const trainerData = response.data.data || [];
        setTrainers(trainerData);
        
        // Generate categories from trainer expertise
        const categoryMap = new Map();
        categoryMap.set("all", { id: "all", name: "All Trainers", count: trainerData.length });
        
        trainerData.forEach(trainer => {
          if (trainer.expertise) {
            const expertiseList = trainer.expertise.split(',').map(e => e.trim());
            expertiseList.forEach(exp => {
              if (exp) {
                const id = exp.toLowerCase().replace(/\s+/g, '-');
                if (categoryMap.has(id)) {
                  const cat = categoryMap.get(id);
                  cat.count = (cat.count || 0) + 1;
                } else {
                  categoryMap.set(id, {
                    id: id,
                    name: exp,
                    count: 1
                  });
                }
              }
            });
          }
        });
        
        setCategories(Array.from(categoryMap.values()));
      } else {
        setTrainers([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching trainers:', err);
      setError('Failed to load trainers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter trainers based on selected category
  const filteredTrainers = selectedCategory === "all" 
    ? trainers 
    : trainers.filter(trainer => {
        if (!trainer.expertise) return false;
        const expertiseList = trainer.expertise.toLowerCase().split(',').map(e => e.trim());
        const categoryName = categories.find(c => c.id === selectedCategory)?.name.toLowerCase() || '';
        return expertiseList.some(exp => exp.includes(categoryName));
      });

  // Default categories if no data
  const displayCategories = categories.length > 0 ? categories : [
    { id: "all", name: "All Trainers", count: trainers.length },
    { id: "development", name: "Development", count: 0 },
    { id: "data-science", name: "Data Science", count: 0 },
    { id: "design", name: "Design", count: 0 },
    { id: "marketing", name: "Marketing", count: 0 },
  ];

  // Get category counts
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return trainers.length;
    const category = categories.find(c => c.id === categoryId);
    return category?.count || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <FaSpinner className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading expert trainers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced with gradient overlay matching home hero */}
      <section 
        className="relative min-h-[60vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm font-medium">Learn from Industry Experts</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Expert Trainers
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Learn from industry professionals with years of real-world experience
          </p>
          {!loading && trainers.length === 0 && (
            <p className="mt-4 text-yellow-300">No trainers available at the moment.</p>
          )}
        </motion.div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Category Filter - Only show if there are trainers */}
      {trainers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap justify-center gap-3">
            {displayCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">
                  ({getCategoryCount(category.id)})
                </span>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Trainers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {trainers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm"
          >
            <FaChalkboardTeacher className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Trainers Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're currently onboarding expert trainers. Please check back later!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredTrainers.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedTrainer(trainer)}
                >
                  {/* Trainer Image */}
                  <div className="relative h-64 overflow-hidden">
                    {trainer.profileImage ? (
                      <img
                        src={trainer.profileImage}
                        alt={trainer.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <span className="text-6xl text-white font-bold">
                          {trainer.name?.charAt(0) || 'T'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Rating Badge */}
                    {trainer.rating > 0 && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                        <FaStar className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {trainer.rating}
                        </span>
                      </div>
                    )}

                    {/* Experience Badge */}
                    {trainer.yearsOfExperience && (
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                        {trainer.yearsOfExperience} years
                      </div>
                    )}
                  </div>

                  {/* Trainer Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {trainer.name || 'Unknown Trainer'}
                    </h3>
                    
                    <p className="text-purple-600 font-medium mb-3">
                      {trainer.expertise?.split(',')[0] || 'Expert Trainer'}
                    </p>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {trainer.bio || 'No bio available.'}
                    </p>

                    {/* Expertise Tags */}
                    {trainer.expertise && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trainer.expertise.split(',').slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                        {trainer.expertise.split(',').length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{trainer.expertise.split(',').length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <FaUsers className="w-4 h-4 text-gray-400" />
                        <span>{(trainer.studentsCount || 0).toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaBookOpen className="w-4 h-4 text-gray-400" />
                        <span>{trainer.coursesCount || 0} courses</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* No Results */}
        {filteredTrainers.length === 0 && trainers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No trainers found in this category.</p>
          </motion.div>
        )}
      </section>

      {/* Trainer Profile Modal */}
      <AnimatePresence>
        {selectedTrainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTrainer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 z-10"
                >
                  ✕
                </button>

                {/* Header with image */}
                <div className="h-64 overflow-hidden">
                  {selectedTrainer.profileImage ? (
                    <img
                      src={selectedTrainer.profileImage}
                      alt={selectedTrainer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <span className="text-8xl text-white font-bold">
                        {selectedTrainer.name?.charAt(0) || 'T'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedTrainer.name}
                      </h2>
                      <p className="text-xl text-purple-600">
                        {selectedTrainer.expertise?.split(',')[0] || 'Expert Trainer'}
                      </p>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex space-x-3">
                      {selectedTrainer.linkedinUrl && (
                        <a
                          href={selectedTrainer.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {selectedTrainer.githubUrl && (
                        <a
                          href={selectedTrainer.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900"
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                      )}
                      {selectedTrainer.email && (
                        <a
                          href={`mailto:${selectedTrainer.email}`}
                          className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <FaEnvelope className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedTrainer.bio || 'No bio available.'}
                    </p>
                  </div>

                  {/* Expertise */}
                  {selectedTrainer.expertise && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTrainer.expertise.split(',').map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Qualifications */}
                  {selectedTrainer.qualification && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Qualifications</h3>
                      <p className="text-gray-600">{selectedTrainer.qualification}</p>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl mb-8">
                    {selectedTrainer.yearsOfExperience && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {selectedTrainer.yearsOfExperience} yrs
                        </div>
                        <div className="text-sm text-gray-600">Experience</div>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {(selectedTrainer.studentsCount || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedTrainer.coursesCount || 0}
                      </div>
                      <div className="text-sm text-gray-600">Courses</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    <Link
                      to={`/courses?trainer=${selectedTrainer.id}`}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                      onClick={() => setSelectedTrainer(null)}
                    >
                      Browse Courses
                    </Link>
                    {selectedTrainer.email && (
                      <a
                        href={`mailto:${selectedTrainer.email}`}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaEnvelope className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Become an Instructor</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Share your expertise with thousands of eager learners. Join our community of expert instructors today.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Apply to Teach
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Trainers;