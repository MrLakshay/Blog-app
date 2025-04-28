import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
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
      <h1 >Login</h1>
      <div>
        <label style={{fontWeight:'bold'}}>Email</label>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} style={{margin:10}}/>
      </div><div>
      <label style={{fontWeight:'bold'}}>Password</label>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} style={{margin:10}}/>
      </div>
      <button type="submit"style={{margin:10}}>Login</button>
    </form>
  );
};

export default Login;
