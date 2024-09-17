import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import {Link} from 'react-router-dom'

function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState(); // Initial state for loading check
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-order-history", { headers });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="text-white p-4 bg-gray-900 min-h-screen">
      {/* Loading state */}
      {!orderHistory && <Loader />}

      {/* Empty order history state */}
      {orderHistory && orderHistory.length === 0 && (
        <div className="flex items-center justify-center h-96">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gray-800 p-6 rounded-lg shadow-lg text-gray-300">
            No Orders Found
          </div>
        </div>
      )}

{/* Order history content */}
{orderHistory && orderHistory.length > 0 && (
  <div className="container mx-auto p-4">
    <h1 className="text-xl font-bold mb-4">Order History</h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center font-semibold border-b border-gray-500 pb-2">
      <div>Sr.</div>
      <div>Books</div>
      <div>Description</div>
      <div>Price</div>
      <div>Status</div>
      <div>Mode</div>
    </div>
    
    {orderHistory.map((items, i) => (
      <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center py-2 border-b border-gray-300">
        <div>{i + 1}</div>
        <Link to={`/view-book-details/${items.book._id}`}>{items.book.title}</Link>
        <div>{items.book.desc.slice(0, 50)}{items.book.desc.length > 50 && "..."}</div>
        <div>${items.book.price}</div>
        
        {/* Status Handling */}
        <div>
          {items.status === "order placed" ? (
            <span className="text-green-600">{items.status}</span>
          ) : items.status === "Canceled" ? (
            <span className="text-red-600">{items.status}</span>
          ) : (
            <span className="text-yellow-600">{items.status}</span>
          )}
        </div>
        <div>COD</div>
      </div>
    ))}
  </div>
)}

    </div>
  );
}

export default UserOrderHistory;
