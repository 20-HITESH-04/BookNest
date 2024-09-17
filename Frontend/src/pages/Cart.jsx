import React, { useState , useEffect} from 'react'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart,setCart] = useState([]) ;
  const [total,setTotal] = useState(0) ;
  const navigate = useNavigate() ;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleDelete = async (bookId) => {
    const response = await axios.put(`http://localhost:3000/api/v1/remove-from-cart/${bookId}`,{},{headers}) ;
    alert(response.data.message) ;
  }

  useEffect(() => {
    const fetch= async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-cart-books", { headers });
        setCart(response.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetch();
  }, [cart]);

  useEffect(() => {
    if(cart && cart.length > 0)
    {
      let tot = 0 ;
      cart.map((items) => {
        tot += items.price
      })
      setTotal(tot)
      tot = 0 ;
    }
  },[cart])

  const handlePlaceOrder = async () => {
    const response = await axios.post('http://localhost:3000/api/v1/place-order',{order : cart},{headers})
    console.log(response)
    navigate("/profile/orderHistory")
  }

  return (
    <div className='bg-black'>
    {!cart && <Loader/>}

    {cart && cart.length === 0 && (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-white p-6 rounded-lg shadow-lg w-full lg:w-auto max-w-md">
      Your Cart is Empty
    </div>
    </div>
    )}


{cart && cart.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 p-4">
    {cart.map((book, index) => (
      <div 
        key={index} 
        className="bg-white p-4 rounded-lg shadow-lg flex flex-col lg:flex-row items-center lg:items-start"
      >
        {/* Book Image */}
        <img
          src={book.url}
          alt={book.title}
          className="h-[30vh] w-auto max-w-full lg:w-[150px] border-4 border-white rounded-md mb-4 lg:mb-0 lg:mr-6"
        />

        {/* Book Info */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600 mt-2">
            {book.desc.slice(0, 100)}...
          </p>
          <p className="text-blue-600 mt-2 font-bold">${book.price.toFixed(2)}</p>
        </div>

        {/* Delete Button */}
        <button
          className="text-red-600 hover:text-red-800 mt-4 lg:mt-0 lg:ml-6"
          onClick={() => handleDelete(book._id)} // Add this function to delete the book
        >
          <MdDelete size={24} />
        </button>
      </div>
    ))}
  </div>
)}

{cart && cart.length > 0 && (
  <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center">
    <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
      <p>
        Total Books: <span className="text-blue-600">{cart.length}</span>
      </p>
      <p>
        Total Amount: <span className="text-green-600">${total.toFixed(2)}</span>
      </p>
    </div>
    <button
      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      onClick={handlePlaceOrder}
    >
      Place Order
    </button>
  </div>
)}

    </div>
  )
}

export default Cart