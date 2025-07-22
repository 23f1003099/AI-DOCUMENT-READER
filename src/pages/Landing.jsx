import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Brain } from 'lucide-react';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold">Welcome to Study Genius AI</h1>
        <p className="text-xl text-indigo-200">
          Your personal AI-powered exam preparation assistant.
        </p>

        <div className="flex justify-center space-x-6">
          <div className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <MessageSquare className="w-10 h-10 text-yellow-300" />
            <p className="mt-3">Chat with Notes</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-pink-300" />
            <p className="mt-3">Auto Notes</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <Brain className="w-10 h-10 text-green-300" />
            <p className="mt-3">Smart Revision</p>
          </div>
        </div>

        <div className="space-x-4">
          <Link to="/signin" className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:scale-105 transition-transform">
            Sign In
          </Link>
          <Link to="/signup" className="px-8 py-3 bg-yellow-300 text-indigo-800 font-semibold rounded-lg shadow hover:scale-105 transition-transform">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
