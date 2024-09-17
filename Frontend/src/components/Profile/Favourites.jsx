import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard'

const Favourites = () => {
  const [favouriteBooks , setFavouriteBooks] = useState([]) ;
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await  axios.get("http://localhost:3000/api/v1/get-favourite-books",{headers}) ;
      setFavouriteBooks(response.data.data) ;
    } ;
    fetch() ;
  },[favouriteBooks])

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {favouriteBooks.length === 0 && <div className="flex-grow flex items-center justify-center bg-gray-800">
  <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-11/12 sm:w-4/5 md:w-3/4 lg:w-[600px]">
    No Favourite Books
  </div>
</div>

}
  {favouriteBooks &&
    favouriteBooks.map((items, i) => (
      <div key={i} className="mb-8">
        <BookCard data={items} favourite={true}/>
      </div>
    ))}
</div>
  )
}

export default Favourites