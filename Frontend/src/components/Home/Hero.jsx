import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between bg-blue-50 py-12 px-6">
      {/* Left Side (Text) */}
      <div className="flex-1 mb-8 md:mb-0 md:mr-6 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
          Welcome to BookNest
        </h1>
        <p className="text-md sm:text-lg text-gray-700 mb-6">
          Discover a world of books at your fingertips. Explore our collection and find your next great read today!
        </p>
        <Link to='/all-books' className="px-6 py-2 border border-blue-600 rounded-full text-blue-500 bg-white hover:bg-blue-200 transition duration-300">
          Explore Now
        </Link>
      </div>

      {/* Right Side (Image) */}
      <div className="flex-1">
        <img
          src="https://thumbs.dreamstime.com/b/book-glowing-digital-earth-network-connections-generative-ai-captivating-image-depicts-open-emerging-its-322799468.jpg"
          alt="Hero Image"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}

export default Hero;
