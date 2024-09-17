import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import {authActions} from '../../store/auth'
import {useDispatch, useSelector} from 'react-redux'

function Sidebar({ data }) {
  const dispatch = useDispatch() ;
  const history = useNavigate() ;
  const role = useSelector((state) => state.auth.role)
  return (
    <div className="lg:w-64 w-full bg-gray-900 text-white p-4 lg:h-screen h-auto">
      {/* Brand / Logo Section */}
      <div className="flex justify-between items-center mb-6">
        <a href="/" className="flex items-center text-white text-decoration-none">
          <svg className="me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="text-xl font-bold">My Sidebar</span>
        </a>

        {/* Dropdown Icon for Mobile */}
        <button
          className="lg:hidden text-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={() => {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
          }}
        >
          <IoIosArrowDropdownCircle size={24} />
        </button>
      </div>

      {/* User Info Section */}
      <div className="mb-6">
        <img src={data.avatar} alt="User" className="w-16 h-16 rounded-full mb-2 mx-auto" />
        <div className="text-center">
          <p className="text-lg font-semibold">{data.username}</p>
          <p className="text-sm text-gray-400">{data.email}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-600 mb-4" />
      
      {role === 'User' && (
        /* Links */
      <div className="space-y-4 text-center lg:text-left" id="mobile-menu">
        <Link
          to="/profile"
          className="block py-2 px-3 bg-gray-800 rounded hover:bg-gray-700 transition"
        >
          Favourites
        </Link>

        <Link
          to="/profile/orderHistory"
          className="block py-2 px-3 bg-gray-800 rounded hover:bg-gray-700 transition"
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="block py-2 px-3 bg-gray-800 rounded hover:bg-gray-700 transition"
        >
          Settings
        </Link>
      </div>)}
      
      {role === 'Admin' && (
        /* Links */
      <div className="space-y-4 text-center lg:text-left" id="mobile-menu">
      <Link
        to="/profile"
        className="block py-2 px-3 bg-gray-800 rounded hover:bg-gray-700 transition"
      >
        All Orders
      </Link>

      <Link
        to="/profile/add-book"
        className="block py-2 px-3 bg-gray-800 rounded hover:bg-gray-700 transition"
      >
        Add Book
      </Link>
    </div>
      )}
      {/* Log Out Button */}
      <div className="mt-8 text-center">
        <button className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500 transition flex items-center justify-center" onClick={() => {
          dispatch(authActions.logout())
          dispatch(authActions.changeRole("user"))
          localStorage.clear("id")
          localStorage.clear("token")
          localStorage.clear("role")
          history('/')
        }}>
          Log Out
          <IoIosLogOut className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
