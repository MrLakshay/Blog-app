import { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogService';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err.response?.data?.message || err.message);
    }
  };
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif",
    textAlign:'center',
    // marginLeft:'30%',
    // marginRight:'30%',
    
    // marginTop:'10%',
    // marginBottom:'10%',
    // marginLeft:'10%',
    // borderRadius:10
  };

  return (
    <div style={myStyle}>
      <h1>All Blog Posts</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{ border: '1px solid #ccc', marginTop: '10px', padding: '10px',backgroundColor:'white',textAlign:"left" ,color:'black'}}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p><strong>Author:</strong> {blog.author?.name || 'Unknown'}</p>
            <p><small>Posted on: {new Date(blog.createdAt).toLocaleDateString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
