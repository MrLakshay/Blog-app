import { useState, useEffect } from 'react';
import { getBlogs, createBlog, deleteBlog } from '../services/blogService';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await createBlog(formData);
      setFormData({ title: '', content: '' });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to create blog:', err.response.data.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog:', err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create Blog</button>
      </form>

      <h2>All Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ border: '1px solid black', marginTop: '10px', padding: '10px' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p>Author: {blog.author?.name || 'Unknown'}</p>
          <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
