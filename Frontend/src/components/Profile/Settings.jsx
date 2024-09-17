import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

function Settings() {
  const [profileData, setProfileData] = useState([]); 
  const [value, setValue] = useState({ address: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-user-information", { headers });
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    setValue({ ...value, address: e.target.value }); // Update only the address field
  };

  const submitAddress = async () => {
    try {
      const response = await axios.put("http://localhost:3000/api/v1/update-address", value, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!profileData && <Loader />}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="text-lg font-semibold text-gray-100 mb-4">
          {profileData.username}
        </div>

        <div className="text-sm text-gray-400 mb-2">
          <label className="block font-bold text-gray-200 mb-1">Email:</label>
          <div>{profileData.email}</div>
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-200 mb-1">Address:</label>
          <textarea
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            name="address"
            value={value.address} // Bind to the value state
            onChange={change}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
            onClick={submitAddress}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
