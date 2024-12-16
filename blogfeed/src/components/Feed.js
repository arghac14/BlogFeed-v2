import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import ApiService from '../api/apiService';


const { getPosts, getUser } = new ApiService();

function Feed() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const getUserPosts = async () => {
    try {
      const posts = await getPosts(); // Fetch all posts
      // Use `Promise.all` for concurrent fetch of all user details
      const postsWithUsernames = await Promise.all(
        posts.map(async (post) => {
          const user = await getUser(parseInt(post.userId));
          return { ...post, userName: user.userName };
        })
      );
      // Update state once with the final processed array
      setBlogs(postsWithUsernames);
      setFilteredBlogs(postsWithUsernames);
    } catch (error) {
      console.error("Error fetching posts or users:", error);
    }
  };

  const debounce = (func, wait = 300) => {
    let timeoutID = null;

    return (...args) => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  const searchBlogs = (value) => {
    if (!value.trim()) {
      // Reset filtered blogs to all blogs if search is empty
      setFilteredBlogs(blogs);
    } else {
      // Filter blogs by the search term
      const filteredBlogsList = blogs.filter((b) =>
        b.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBlogs(filteredBlogsList);
    }
  };

  const debouncedSearch = debounce(searchBlogs, 1000);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    getUserPosts();
  }, []);
    
    return (
        
    <div>
    <div style={{
          textAlign: "center",
          margin: "40px 0",
          backgroundColor: "#ffd5cd",
          borderBottom: "2px solid grey",
          borderRadius: "0 0 30px 30px",
          boxShadow: "6px 8px 6px grey"
      }}>
            <img class="neu" style={{width:"145px",height:"145px",borderRadius:"50%"}}
        src = {require("../assets/logo1.PNG")}/>
        <br></br><br></br>
       <h1>BlogFeed</h1>
       <h3>A blogging site <i style={{textDecoration: "none", color: "#ED6663"}} class="fa fa-pencil" aria-hidden="true"></i></h3>
       <hr></hr> <h6>Made with <span style={{color: "red"}}>&#10084;</span> by &nbsp;<a style={{textDecoration: "none", color: "rgb(237,102,99)", textShadow: "2px"}} href="https://arghac14.github.io">@arghac14</a></h6>
      </div>

      <div className="search-container">
        <div className="wrap">
          <div className="search">
              <input type="text" className="searchTerm" placeholder="What are you looking for?" value={searchItem} onChange={handleSearchChange}/>
              <button type="submit" class="searchButton">
                <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="gen-feed">
  <div className="container">
    <div className="row">
      {filteredBlogs && filteredBlogs.length > 0 ? (
        filteredBlogs.map((item) => {
          return (
            <div
              className="post-card"
              key={item.id}
              style={{ backgroundColor: "#ffd5cd" }}
            >
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div
                  className="post-neu card"
                  style={{ borderRadius: "20px 20px 20px 20px" }}
                >
                  <img
                    className="card-img"
                    style={{
                      maxHeight: "230px",
                      borderRadius: "20px 20px 0px 0px",
                    }}
                    src={
                      item.coverPhoto
                        ? item.coverPhoto
                        : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                    }
                    alt="Loading.."
                  />

                  <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <small className="text-muted cat">
                      Posted by{" "}
                      <Link to={"/profile/" + item.userId}>
                        {item.userName}{" "}
                      </Link>
                    </small>
                    <p className="card-text">{item.tag}</p>
                    <small className="text-muted cat">
                      <Link to={"/post/" + item.id}>
                        <a
                          href={"/post/" + item.id}
                          style={{
                            backgroundColor: "#ed6663",
                            color: "whitesmoke",
                            border: "none",
                          }}
                          className="btn-neu btn btn-info"
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>
                          &nbsp; See full story
                        </a>
                      </Link>
                    </small>
                    <br />
                  </div>
                  <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                    <div className="views">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      &nbsp;{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        // Show "No Blogs Found" message when filteredBlogs is empty
        <div className="col-12 text-center">
          <p style={{ marginTop: "20px", fontSize: "18px", color: "#666" }}>
            No Blogs Found
          </p>
        </div>
      )}
    </div>
  </div>
</div>

  </div>   
)
}

export default Feed;
