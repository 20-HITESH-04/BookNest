import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import {useSelector} from 'react-redux' ;
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

function Profile() {
  const [profile, setProfile] = useState(null);
  //const isLoggedIn = useSelector() ;
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-user-information", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col lg:flex-row">
      {/* Show loader if profile is not yet loaded */}
      {!profile ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {/* Sidebar Section: On mobile it will be on top, on larger screens on the left */}
          <div className="w-full lg:w-64 bg-gray-800 min-h-[20vh] lg:min-h-screen p-4 lg:static lg:h-auto z-50">
  <Sidebar data={profile} />
  </div>

          {/* Main Content Section */}
          <div className="w-full lg:w-5/6 p-4 lg:p-8">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
