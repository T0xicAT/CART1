import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/signin');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96 transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
          <div className="flex items-center border rounded-lg p-2 bg-gray-100">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
          <div className="flex items-center border rounded-lg p-2 bg-gray-100">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
          <div className="flex items-center border rounded-lg p-2 bg-gray-100">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
