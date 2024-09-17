import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard';
import axios from 'axios'

function AllBooks() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-all-book");
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='bg-black'>
          <div className="container mx-auto px-4 py-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
          All Books
        </h3>
        {!Data && (<div className='flex items-center justify-center'><Loader/></div>)}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data.map((item, id) => (
          <div key={id} className="justify-center">
            <BookCard data={item} />
          </div> 
        ))}
      </div>
    </div>
    </div>
  )
}

export default AllBooks