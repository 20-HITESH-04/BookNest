import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Loader from '../Loader/Loader';
import { FaShoppingCart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import {useSelector} from 'react-redux' ;
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function ViewBookDetails() {
    const { id } = useParams();
    const [Data, setData] = useState(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)

    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, []);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid : id ,
      };

    const handleFavourites = async () => {
        const response = await axios.put("http://localhost:3000/api/v1/add-book-to-favourite",{},{headers}) ;
        alert(response.data.message) ;
    }

    const handleCart = async () => {
        const response = await axios.put("http://localhost:3000/api/v1/add-to-cart",{},{headers}) ;
        alert(response.data.message) ;
    }

  const deleteBook = async () => {
    const response = await axios.delete("http://localhost:3000/api/v1/delete-book",{headers}) ;
    alert(response.data.message) ;
    navigate('/all-books')
}

    if (!Data) return <Loader />;

    return (
        <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl bg-gray-900 rounded-lg shadow-lg p-6">
                {Data ? (
                    <div className="flex flex-col lg:flex-row">
                    <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-6">
                      <img
                        className="w-full h-64 object-cover rounded-lg"
                        src={Data.url}
                        alt={Data.title}
                      />
                    </div>
                  
                    <div className="flex-grow mb-6 lg:mb-0">
                      <h1 className="text-3xl font-bold mb-4">{Data.title}</h1>
                      <p className="text-lg mb-4">by {Data.author}</p>
                      <p className="text-xl font-semibold mb-4">${Data.price}</p>
                      <p className="text-base mb-6">{Data.desc}</p>
                      <p className="text-sm text-gray-400">Language: {Data.language}</p>
                    </div>

                    {isLoggedIn && role === "User" && (
                        <div className="flex lg:flex-col lg:space-y-4 space-x-4 lg:space-x-0 lg:mt-4 lg:ml-6 mt-4">
                      <button className="flex items-center justify-center p-2 bg-gray-200 hover:bg-gray-300 text-red-500 rounded-full shadow-md transition duration-300" onClick={handleFavourites}>
                        <FcLike size={24} />
                      </button>
                      <button className="flex items-center justify-center p-2 bg-gray-200 hover:bg-gray-300 text-blue-500 rounded-full shadow-md transition duration-300" onClick={handleCart}>
                        <FaShoppingCart size={24} />
                      </button>
                    </div>
                    )}

                        {isLoggedIn && role === "Admin" && (
                        <div className="flex lg:flex-col lg:space-y-4 space-x-4 lg:space-x-0 lg:mt-4 lg:ml-6 mt-4">
                      <Link to={`/updateBook/${id}`} className="flex items-center justify-center p-2 bg-gray-200 hover:bg-gray-300 text-red-500 rounded-full shadow-md transition duration-300">
                      <FaEdit size={24}/>
                      </Link>
                      <button className="flex items-center justify-center p-2 bg-gray-200 hover:bg-gray-300 text-blue-500 rounded-full shadow-md transition duration-300" onClick={deleteBook}>
                      <MdDelete size={24}/>
                      </button>
                    </div>
                    )}
                  </div>                  
                ) : (
                    <p>No book details available.</p>
                )}
            </div>
        </div>
    );
}

export default ViewBookDetails;
