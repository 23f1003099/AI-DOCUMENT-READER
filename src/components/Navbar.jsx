import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Home, Settings, User, Plus, UploadCloud, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [showUploadBox, setShowUploadBox] = useState(false);
  const uploadRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadRef.current && !uploadRef.current.contains(event.target)) {
        setShowUploadBox(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploaded:', file.name);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Learnado Study
            </span>
          </Link>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <Home className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            <button className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* + Button */}
            <div className="relative" ref={uploadRef}>
              <button
                title="Add New Document"
                onClick={() => setShowUploadBox(!showUploadBox)}
                className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-110 hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>

              {/* Upload Box */}
              {showUploadBox && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl p-4 z-50">
                  <div className="flex flex-col items-center space-y-3">
                    <UploadCloud className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                      Upload a new document to your study library
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleUpload}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-indigo-100 file:text-indigo-700
                                 hover:file:bg-indigo-200 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
