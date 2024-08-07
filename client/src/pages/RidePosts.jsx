import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../usercontext/UserContext";
import { toast } from "react-toastify";
import "../styles/RidePost.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Link, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faSnowflake,
  faDog,
  faMusic,
  faBicycle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faPlus, faSnowflake, faDog, faMusic, faBicycle, faEnvelope);

function RidePosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState([0, 300]);
  const [seatsFilter, setSeatsFilter] = useState("");
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.warning("Please login or signup to view posts");
          navigate("/register");
        } else {
          console.error(error);
          toast.warning("An error occurred while fetching posts");
        }
      }
    };

    if (token) {
      fetchPosts();
    } else {
      toast.warning("Please login or signup to view posts");
      navigate("/register");
    }
  }, [token, navigate]);

  const handleSearch = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.destinationFrom
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          post.destinationTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter) {
      filtered = filtered.filter(
        (post) => post.price >= priceFilter[0] && post.price <= priceFilter[1]
      );
    }

    if (seatsFilter) {
      filtered = filtered.filter(
        (post) => post.seatsAvailable.toString() === seatsFilter
      );
    }

    setFilteredPosts(filtered);
  };

  const handleClearFilter = (filterType) => {
    if (filterType === "search") {
      setSearchTerm("");
    } else if (filterType === "price") {
      setPriceFilter([0, 300]);
    } else if (filterType === "seats") {
      setSeatsFilter("");
    }
    handleSearch();
  };

  const handlePriceChange = (values) => {
    const [min, max] = values;
    if (min === 0 && max < 10) {
      setPriceFilter([0, 10]);
    } else if (min < 10 && min !== 0) {
      setPriceFilter([10, max]);
    } else {
      setPriceFilter(values);
    }
  };

  return (
    <div className="ride-posts-container">
      <div className="header">
        <h1>Ride Posts</h1>
        <Link to="/createpost" className="create-post-btn">
          <FontAwesomeIcon icon={faPlus} />
          <span>Create Post</span>
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="advanced-filters">
        <a
          href="#"
          className="advanced-filters-toggle"
          onClick={(e) => {
            e.preventDefault();
            setShowAdvancedFilters(!showAdvancedFilters);
          }}
        >
          {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
        </a>
        {showAdvancedFilters && (
          <div className="advanced-filters-content">
            <div className="filter-group">
              <label>Price Range:</label>
              <Slider
                range
                min={0}
                max={300}
                value={priceFilter}
                onChange={handlePriceChange}
                step={1}
              />
              <div className="price-labels">
                <span>${priceFilter[0]}</span>
                <span>${priceFilter[1]}</span>
              </div>
            </div>
            <div className="filter-group">
              <label>Seats:</label>
              <select
                value={seatsFilter}
                onChange={(e) => setSeatsFilter(e.target.value)}
                className="filter-input"
              >
                <option value="">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>
            <button onClick={handleSearch} className="apply-filter-btn">
              Apply Filters
            </button>
          </div>
        )}
      </div>
      <div className="applied-filters">
        {searchTerm && (
          <span className="filter-tag">
            Location: {searchTerm}
            <button onClick={() => handleClearFilter("search")}>x</button>
          </span>
        )}
        {(priceFilter[0] !== 0 || priceFilter[1] !== 300) && (
          <span className="filter-tag">
            Price: ${priceFilter[0]} - ${priceFilter[1]}
            <button onClick={() => handleClearFilter("price")}>x</button>
          </span>
        )}
        {seatsFilter && (
          <span className="filter-tag">
            Seats: {seatsFilter}
            <button onClick={() => handleClearFilter("seats")}>x</button>
          </span>
        )}
      </div>
      <div className="post-list">
        {filteredPosts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <h2>
                {post.destinationFrom} to {post.destinationTo}
              </h2>
              <p className="post-date">
                Date: {new Date(post.timeOfRideShare).toLocaleString()}
              </p>
            </div>
            <p>Posted by: {post.user ? post.user.name : "Unknown User"}</p>
            <p>Price: ${post.price}</p>
            <p>Seats Available: {post.seatsAvailable}</p>
            <div className="preferences">
              <p>
                <FontAwesomeIcon icon={faSnowflake} /> Winter Tires:{" "}
                {post.winterTires ? "Yes" : "No"}
              </p>
              <p>
                <FontAwesomeIcon icon={faDog} /> Pets:{" "}
                {post.pets ? "Yes" : "No"}
              </p>
              <p>
                <FontAwesomeIcon icon={faMusic} /> Music:{" "}
                {post.music ? "Yes" : "No"}
              </p>
              <p>
                <FontAwesomeIcon icon={faBicycle} /> Bikes:{" "}
                {post.bikes ? "Yes" : "No"}
              </p>
            </div>
            <p>Luggage: {post.luggage}</p>
            <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
            <div className="post-footer">
              <button className="message-button">
                <FontAwesomeIcon icon={faEnvelope} /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RidePosts;
