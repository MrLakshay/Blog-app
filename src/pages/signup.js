import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' ,role:''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      localStorage.setItem('token', res.token);
      navigate('/blogs');
    } catch (err) {
      console.error(err.response.data.message);
    }
  };
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif",
    textAlign:'center',
    marginLeft:'30%',
    marginRight:'30%',
    
    marginTop:'10%',
    marginBottom:'10%',
    // marginLeft:'10%',
    borderRadius:10
  };


  return (
    <form onSubmit={handleSubmit} style={myStyle}>
      <h1>SignUp</h1>
      <label>Name</label>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} style={{margin:10,}}/><br/>
      <label>Email</label>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} style={{margin:10}}/><br/>
      <label>Password</label>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} style={{margin:10}}/><br/>
      <label>Role type</label>
      <input type="text" name="role" placeholder="user/admin" onChange={handleChange} style={{margin:10}}/><br/>
      
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
