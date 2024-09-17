import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { LiaFileExportSolid } from "react-icons/lia";
import SeeUserData from './SeeUserData';

function AllOrder() {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [value, setValue] = useState({ status: "" });
  const [userDiv , setUserDiv] = useState("hidden") ;
  const [userDivData , setUserDivData] = useState() ;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch orders when component mounts
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/get-all-orders', { headers });
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);

  // Open dropdown and set the current status in the dropdown
  const setOptionsButton = (i) => {
    setOptions(i);
    setValue({ status: allOrders[i].status });
  };

  // Handle change in dropdown selection
  const change = (e) => {
    const { value } = e.target;
    setValue({ status: value });
  };

  // Submit the changes and update the local state for instant feedback
  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/update-order/${id}`, value, { headers });
      alert(response.data.message);

      // Update the local order state for immediate feedback
      const updatedOrders = [...allOrders];
      updatedOrders[i].status = value.status;
      setAllOrders(updatedOrders);

    } catch (error) {
      console.error('Error updating status', error);
    }
    setOptions(-1); // Hide the dropdown after successful submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-100 mb-6">All Orders</h1>
      {!allOrders && <Loader />}
      {allOrders && allOrders.length === 0 && <div>No Orders</div>}
      {allOrders && allOrders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-4 py-2 border border-gray-700">Sr.</th>
                <th className="px-4 py-2 border border-gray-700">Books</th>
                <th className="px-4 py-2 border border-gray-700">Description</th>
                <th className="px-4 py-2 border border-gray-700">Price</th>
                <th className="px-4 py-2 border border-gray-700">Status</th>
                <th className="px-4 py-2 border border-gray-700"><i className="fas fa-user"><CgProfile />
                </i></th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-300">
              {allOrders.map((order, index) => (
                <tr key={order._id} className="border-t border-gray-700">
                  <td className="px-4 py-2 text-center border border-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    {order.book ? (
                      <Link to={`/view-book-details/${order.book._id}`}>
                        {order.book.title}
                      </Link>
                    ) : "N/A"}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">{order.book ? order.book.desc.slice(0, 50) + "..." : "N/A"}</td>
                  <td className="px-4 py-2 border border-gray-700">₹{order.book ? order.book.price : "N/A"}</td>
                  <td className="w-[30%] md:w-[16%]">
                    <div className="font-semibold">
                      <button
                        className="hover:scale-105 transition-all duration-300"
                        onClick={() => setOptionsButton(index)}
                      >
                        {order.status === "Order placed" ? (
                          <div className="text-yellow-500">{order.status}</div>
                        ) : order.status === "Canceled" ? (
                          <div className="text-red-500">{order.status}</div>
                        ) : (
                          <div className="text-green-500">{order.status}</div>
                        )}
                      </button>
                    </div>

                    {options === index && (
                      <div className="flex mt-2">
                        <select
                          name="status"
                          id="status"
                          className="bg-gray-800 text-white p-2 rounded-md w-full focus:outline-none"
                          onChange={change}
                          value={value.status}
                        >
                          <option value="Order placed">Order placed</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                        <button
                          onClick={() => submitChanges(index)}
                          className="ml-2 bg-blue-600 text-white p-2 rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-700">
                    <button onClick={() => {
                      setUserDiv("fixed")
                      setUserDivData(order.user)
                    }}>
                    <i className="fas fa-check-circle text-green-500"><LiaFileExportSolid />
                    </i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {userDivData && (
        <SeeUserData
        userDivData = {userDivData}
        userDiv = {userDiv}
        setUserDiv = {setUserDiv}
        />
      )}
    </div>
  );
}

export default AllOrder;
