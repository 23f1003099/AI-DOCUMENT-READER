import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const handleRegister = () => {
    localStorage.setItem("token", "mocked-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[400px] space-y-6">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>

        <input className="w-full p-3 border rounded-lg" placeholder="Email" />
        <input className="w-full p-3 border rounded-lg" placeholder="Username" />
        <input type="password" className="w-full p-3 border rounded-lg" placeholder="Password" />

        <button onClick={handleRegister} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account? <Link to="/signin" className="text-indigo-600 font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

