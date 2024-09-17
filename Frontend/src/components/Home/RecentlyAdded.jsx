import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

function RecentlyAdded() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-recent-book");
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
          Recently Added Books
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
  );
}

export default RecentlyAdded;
