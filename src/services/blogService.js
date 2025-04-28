import API from '../api/axios';

export const getBlogs = async () => {
  const res = await API.get('/blogs');
  return res.data;
};

export const createBlog = async (blogData) => {
  const res = await API.post('/blogs', blogData);
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await API.delete(`/blogs/${id}`);
  return res.data;
};
