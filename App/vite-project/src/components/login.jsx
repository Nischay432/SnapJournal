
import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';


const Login = () => {
  const { login } = useAuth();
  const [user, setuser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value
    });
  };

  const validateForm = () => {
    const { email, password } = user;

    if (!email.trim() || !password.trim()) {
      alert("Email and password are required");
      return false;
    }

    return true;
  };

  const loginHandler = () => {
    if (validateForm()) {
      axios.post("http://localhost:8000/login", user, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          login(response.data.existingUser);
          alert(response.data.message);
          if(response.data.message == "Login Successfully")
          {
            navigate('/');
          }
          else{
            navigate('/login');
          }
          
        })
        .catch(error => {
          console.error("Error:", error.message);
        });
    }
  };

  return (
    <div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
        <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={handleChange}></input>
        <div className="button" onClick={loginHandler}>Login</div>
        <div>Or</div>
        <div className="button" onClick={() => navigate('/register')}>Register</div>
      </div>
    </div>
  );
};

export default Login;
