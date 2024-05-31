import React, { useState } from "react";
import { Link } from "react-router-dom";
import postService from "../services/postService";
import { useAuth } from "../context/AuthContextProvider";

function CreateComponent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const {user}=useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("date", date);
    formData.append("image", image);
    formData.append("_id",user._id);
    try {
      const response = await postService.create(formData);
      setMessage("Post created Successfully.");

      setTimeout(() => {
        setMessage("");
      }, 2000);
      event.target.reset();
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Error creating post. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link to="/" className="absolute top-0 left-0 text-blue-500 text-sm font-semibold mt-4 ml-4">
        &larr; Back to Home
      </Link>
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Enter Post Title"
              onChange={(event) => setTitle(event.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="date"
              onChange={(event) => setDate(event.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="image"
              onChange={(event) => setImage(event.target.files[0])}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              Submit
            </button>
          </div>
        </form>
        <p className={`text-green-500 text-center ${message ? 'mb-4' : 'hidden'}`}>{message}</p>
      </div>
    </div>
  );
}

export default CreateComponent;
