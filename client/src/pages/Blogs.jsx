import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./Blogs.css"; // Import CSS file for styling

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Function to fetch all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch blogs when component mounts
  useEffect(() => {
    getAllBlogs();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state with input value
  };

  // Function to filter blogs based on search query
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="centered-container">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      
      {/* Display filtered blogs */}
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog?._id} // Add key prop for optimization
          id={blog?._id}
          isUser={localStorage.getItem("userId") === blog?.user?._id}
          title={blog?.title}
          description={blog?.description}
          image={blog?.image}
          username={blog?.user?.username}
          time={blog.createdAt}
        />
      ))}
    </div>
  );
};

export default Blogs;
