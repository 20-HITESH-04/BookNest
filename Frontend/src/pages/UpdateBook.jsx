import React , {useState , useEffect} from 'react'
import axios from 'axios'
import {useParams , useNavigate} from 'react-router-dom'

function UpdateBook() {

  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: ""
  });

  const {id} = useParams() ;
  const navigate = useNavigate() ;
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid : id
  };

  const change = (e) => {
    const {name,value} = e.target
    setData({...data , [name]:value})
  }

  const submit = async () => {
    try{
      if(
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      )
      {
        alert("All are required fields !! Compulsory")
      }else{
        const response = await axios.put("http://localhost:3000/api/v1/update-book",data,{headers})
        setData({
          url : "",
          title : "",
          author : "",
          price : "",
          desc : "",
          language : "",
        })
        alert(response.data.message)
        navigate(`/view-book-details/${id}`)
      }
    }catch(error){
      alert(error.response.data.message)
    }
  }

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

  return (
    <div className=" bg-black container mx-auto p-4">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Update Book</h1>
      
      {/* URL */}
      <div className="mb-4">
        <label className="block font-bold text-gray-200 mb-1">Image URL:</label>
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="url"
          placeholder="Enter book image URL"
          value={data.url}
          onChange={change}
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-bold text-gray-200 mb-1">Title:</label>
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="title"
          placeholder="Enter book title"
          value={data.title}
          onChange={change}
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block font-bold text-gray-200 mb-1">Author:</label>
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="author"
          placeholder="Enter author name"
          value={data.author}
          onChange={change}
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block font-bold text-gray-200 mb-1">Price:</label>
        <input
          type="number"
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="price"
          placeholder="Enter book price"
          value={data.value}
          onChange={change}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-bold text-gray-200 mb-1">Description:</label>
        <textarea
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          name="desc"
          placeholder="Enter book description"
          value={data.desc}
          onChange={change}
        />
      </div>

      {/* Language */}
      <div className="mb-4">
        <label className="block font-bold text-gray-200 mb-1">Language:</label>
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="language"
          placeholder="Enter book language"
          value={data.language}
          onChange={change}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none" onClick={submit}>
          Update Book
        </button>
      </div>
    </div>
  </div>
  )
}

export default UpdateBook