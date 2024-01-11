import React, { useState, useEffect } from 'react';
import userService from '../services/users'; // Adjust the path as needed
import blogService from '../services/blogs'


const Blog = ({ blog, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [blogUser, setBlogUser] = useState(null);
  const [likes, setLikes] = useState(blog.likes);


  useEffect(() => {
    console.log('Fetching user for blog with userID:', blog.user);
    if (blog.user) {
      userService.getById(blog.user)
        .then(user => {
          console.log('Fetched user:', user);
          setBlogUser(user);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [blog.user]);
  
  console.log(blog.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes); // Update local state

    blogService.update(blog.id, { ...blog, likes: updatedLikes })
      .then(updatedBlog => {
        console.log('Likes updated:', updatedBlog.likes);
      })
      .catch(error => {
        console.error('Error updating likes:', error);
      });
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>URL: <a href={blog.url}>{blog.url}</a></p>
          <p>Likes: {likes} <button onClick={handleLike}>Like</button></p>
          {blogUser && <p>Added by: {blogUser.username}</p>}
        </div>
      )}
    </div>  
  );
  
};

export default Blog;