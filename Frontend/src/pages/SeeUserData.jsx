import React from 'react';

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <>
      {/* Overlay Background */}
      <div
        className={`${
          userDiv
        } fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 z-40`}
      ></div>

      {/* Modal for User Information */}
      <div
        className={`${
          userDiv
        } fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50`}
      >
        <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button onClick={() => setUserDiv("hidden")} className="text-red-500 font-bold">
              ✕
            </button>
          </div>

          {/* User Information */}
          <div className="mt-2">
            <label className="block font-semibold">Username:</label>
            <span className="block mt-1 text-gray-700 font-semibold">
              {userDivData.username}
            </span>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Email:</label>
            <span className="block mt-1 text-gray-700 font-semibold">
              {userDivData.email}
            </span>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Address:</label>
            <span className="block mt-1 text-gray-700 font-semibold">
              {userDivData.address}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
