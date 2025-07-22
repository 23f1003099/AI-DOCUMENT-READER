import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock authentication
    localStorage.setItem("token", "mocked-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[400px] space-y-6">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>

        <input className="w-full p-3 border rounded-lg" placeholder="Email" />
        <input type="password" className="w-full p-3 border rounded-lg" placeholder="Password" />

        <button onClick={handleLogin} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
