import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' ;

function SignUp() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const navigate = useNavigate() ;

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    try {
      if (values.username === '' || values.password === '' || values.email === '' || values.address === '') {
        alert('All are required fields');
      } else
      {
        const response = await axios.post("http://localhost:3000/api/v1/sign-up",values) ;
        alert(response.data.message) ;
        navigate('/Login')
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="name">Username</label>
            <input
              id="name"
              name="username" // Add name attribute
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              value={values.username}
              onChange={change}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email" // Add name attribute
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              value={values.email}
              onChange={change}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              name="password" // Add name attribute
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              value={values.password}
              onChange={change}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="address">Address</label>
            <input
              id="address"
              name="address" // Add name attribute
              type="text"
              placeholder="Enter your address"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              value={values.address}
              onChange={change}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className='text-white mb-3'>Or</p>
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
