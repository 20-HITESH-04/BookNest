import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { title: 'Home', link: '/' },
    { title: 'About Us', link: '/about-us' },
    { title: 'All-Books', link: '/all-books' },
    { title: 'Cart', link: '/cart' },
    { title: 'Profile', link: '/profile' },
    { title: 'Admin Profile' , link: '/profile'}
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role) ;

  if(isLoggedIn == true && role === 'Admin')
  {
    links.splice(4,1)
  }

  if(isLoggedIn === true && role === 'User')
  {
    links.splice(5,1)
  }

  if (isLoggedIn === false) {
    links.splice(3, 3);
  }

  return (
    <nav className="bg-blue-900 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center text-white">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1ILSCk5bxx64r7RG3cUvkE3zJWrQHJ_wjg&s"
            width="60"
            height="40"
            alt="BookNest Logo"
            className="mr-3 rounded"
          />
          <span className="text-3xl font-bold">BookNest</span>
        </a>

        {/* Arrow Dropdown Icon for Mobile */}
        <div className="block lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IoIosArrowDropdownCircle size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`w-full block lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {links.map((items, i) => (
            <Link
              to={items.link}
              key={i}
              className="block lg:inline-block lg:mt-0 text-white hover:bg-blue-700 px-4 py-2 rounded transition duration-300"
            >
              {items.title}
            </Link>
          ))}

          {/* Buttons */}
          {!isLoggedIn && (
            <div className="mt-4 lg:mt-0 flex space-x-4">
              <Link
                to="/Login"
                className="ms-3 px-4 py-2 border border-blue-500 rounded text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-2 border border-blue-500 rounded text-blue-600 bg-white hover:bg-blue-100 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
