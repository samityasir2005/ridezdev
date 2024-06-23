import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../usercontext/UserContext";
import { toast } from "react-toastify";
import "../styles/RidePost.css";
function RidePosts() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data.posts);
      } catch (error) {
        toast.error("Error fetching posts");
        console.error(error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div>
      <h1>Ride Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>
            {post.destinationFrom} to {post.destinationTo}
          </h2>
          <p>Posted by: {post.user ? post.user.name : "Unknown User"}</p>
          <p>Date: {new Date(post.timeOfRideShare).toLocaleString()}</p>
          <p>Price: ${post.price}</p>
          <p>Seats Available: {post.seatsAvailable}</p>
          <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default RidePosts;
