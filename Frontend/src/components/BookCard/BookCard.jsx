import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

function BookCard({ data , favourite}) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid : data._id ,
  };

  const handleRemoveFavourites = async () => {
    const response = await  axios.put("http://localhost:3000/api/v1/remove-book-from-favourite",{},{headers}) ;
    alert(response.data.message) ;
  } ;

  return (
    <div className='bg-white rounded'>
    <Link 
      to={`/view-book-details/${data._id}`} 
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-4 transform hover:-translate-y-4"
    >
<div className='bg-gray-400 flex items-center justify-center rounded-lg p-4 shadow-lg'>
  <img 
    className="h-[30vh] w-auto max-w-full border-4 border-white rounded-md" 
    src={data.url} 
    alt={data.title} 
  />
</div>
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800">{data.title}</p>
        <p className="text-gray-600 mt-1">{data.author}</p>
        <p className="text-blue-600 mt-2 font-bold">${data.price.toFixed(2)}</p>
      </div>
    </Link>
    {favourite && (
      <center className='bg-white p-1 pt-1 rounded'>
          <button className="flex items-center justify-center p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-300 text-sm md:text-base" onClick={handleRemoveFavourites}>
            Remove from Favourites
          </button>
          </center>
        )}
      </div>
  );
}

export default BookCard;
