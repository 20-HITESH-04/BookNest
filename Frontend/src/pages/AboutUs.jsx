import React from 'react';

function AboutUs() {
  return (
    <div className="bg-black container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">About Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Welcome to BookNest, your one-stop solution for all your book needs. We are committed to providing
          the best selection of books, with exceptional customer service and competitive pricing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Our Mission</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Our mission is to inspire and empower readers by providing them with access to a vast collection
            of books across various genres. We believe in the transformative power of knowledge and creativity.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Our Values</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            We are committed to sustainability, inclusivity, and continuous improvement. At BookNest, every
            decision we make is centered around the needs of our customers and the environment.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Join Our Community</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Whether you're a casual reader or a dedicated bookworm, BookNest is the perfect place for you to discover
          new books, share your thoughts, and connect with others who love reading.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
