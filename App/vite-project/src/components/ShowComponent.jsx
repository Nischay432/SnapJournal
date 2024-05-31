import React, { useState, useEffect } from "react";
import { FaTrash, FaMemory, FaHome, FaPlus, FaSignInAlt } from "react-icons/fa";
import { Link, Routes, Route } from "react-router-dom";
import postService from "../services/postService";
import UpdateModalComponent from "./UpdateModalComponent";
import CreateComponent from "./CreateComponent";
import MonthYearFilter from "./MonthYearFilter";
import { useAuth } from "../context/AuthContextProvider";

function ShowComponent() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState({ month: "", year: "" });

  const fetchPosts = async () => {
    try {
      const response = await postService.getPosts(user._id);
      setPosts(response.data.data);
      setFilteredPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await postService.deletePost(id);
      if (response.data.success === true) {
        alert(response.data.msg);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        setFilteredPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== id)
        );
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const applyFilter = () => {
    const filteredData = posts.filter((post) => {
      if (filter.month && filter.year) {
        const postDate = new Date(post.date);
        return (
          postDate.getMonth() + 1 === parseInt(filter.month) &&
          postDate.getFullYear() === parseInt(filter.year)
        );
      } else if (filter.month) {
        const postDate = new Date(post.date);
        return postDate.getMonth() + 1 === parseInt(filter.month);
      } else if (filter.year) {
        const postDate = new Date(post.date);
        return postDate.getFullYear() === parseInt(filter.year);
      }
      return true;
    });

    setFilteredPosts(filteredData);
  };

  const renderAuthenticatedContent = () => {
    return (
      <>
        <h1>{user.name}</h1>
        <button onClick={logout}>Logout</button>
      </>
    );
  };

  const renderUnauthenticatedContent = () => {
    return (
      <>
        <h1 className="text-4xl font-bold mb-6">Memories</h1>
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
      {/* Header */}
      <div className="col-span-3 bg-gray-900 p-4 text-white">
      <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <FaMemory className="mr-2" />
              SnapJournal
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hover:text-gray-300 inline-flex items-center"
            >
              <FaHome className="mr-1" />
              Home
            </Link>
            <Link
              to="/create"
              className="hover:text-gray-300 inline-flex items-center"
            >
              <FaPlus className="mr-1" />
              Create
            </Link>
            {user ? (
              renderAuthenticatedContent()
            ) : (
              <Link
                to="/login"
                className="hover:text-gray-300 inline-flex items-center"
              >
                <FaSignInAlt className="mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="col-span-1 bg-gray-800 p-4 text-white h-3/4 rounded ml-1">
        <MonthYearFilter
          filter={filter}
          setFilter={setFilter}
          applyFilter={applyFilter}
        />
      </div>

      {/* Body */}
      <div className="col-span-1 bg-gray-200 p-4 rounded">
        <Routes>
          <Route
            path="/"
            element={
              <ShowContent posts={filteredPosts} deletePost={deletePost} />
            }
          />
          <Route path="/create" element={<CreateComponent />} />
        </Routes>
      </div>

      {/* Sidebar */}
      <div className="col-span-1 bg-gray-800 p-4 text-white h-1/2 rounded">
        <h2 className="text-2xl font-bold mb-4">Search</h2>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Search Title:
          </label>
          <input
            className="w-full border text-black border-gray-300 p-2 rounded-md"
            type="text"
            placeholder="Enter title to search"
          />
        </div>
      </div>
    </div>
  );
}

const ShowContent = ({ posts, deletePost }) => (
  <>
    <h1 className="text-4xl font-bold mb-6">Memories</h1>
    {posts.map((post) => (
      <div
        key={post._id}
        className="bg-white border border-gray-300 p-6 mb-4 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.date}</p>
        <img
          src={`http://127.0.0.1:8000/api/postImages/${post.image}`}
          alt=""
          className="w-full h-40 object-cover rounded mb-4 shadow-md"
        />

        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700 mr-2"
            id={post._id}
            onClick={() => deletePost(post._id)}
          >
            <FaTrash />
          </button>
          <UpdateModalComponent
            id={post._id}
            title={post.title}
            date={post.date}
          />
        </div>
      </div>
    ))}
  </>
);

export default ShowComponent;
