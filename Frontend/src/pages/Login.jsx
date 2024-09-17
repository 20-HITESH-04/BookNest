import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authActions} from '../store/auth' ;
import axios from 'axios';
import {useDispatch} from 'react-redux' ;

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); 
  const dispatch = useDispatch() ;

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault() ;
    try {
      if (values.username === '' || values.password === '') {
        alert('All fields are required');
      } else {
        const response = await axios.post('http://localhost:3000/api/v1/sign-in', values);

        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem("id" , response.data.id) ;
        localStorage.setItem("token" , response.data.token) ;
        localStorage.setItem("role" , response.data.role) ;
        navigate('/'); // Navigate after successful login
      }
    }  catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={values.username}
              onChange={change}
              placeholder="Enter your username"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={change}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"

          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className='text-white mb-3'>Or</p>
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
