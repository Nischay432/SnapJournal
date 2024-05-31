
import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';

const Register = () => {
  const { login } = useAuth();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterpassword: ""
  });

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/login');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value
    });
  };

  const validateForm = () => {
    const { name, email, password, reEnterpassword } = user;

    if (!name.trim() || !email.trim() || !password.trim() || !reEnterpassword.trim()) {
      alert("All fields are required");
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert("Invalid name. Only alphabets and spaces are allowed.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email address");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }

    if (password !== reEnterpassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const register = () => {
    if (validateForm()) {
      axios.post("http://localhost:8000/register", user, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          login(response.data.existingUser);
          alert(response.data.message);
          navigate('/login');
        })
        .catch(error => {
          console.error("Error:", error.message);
        });
    }
  };

  return (
    <div>
      <div className="register">
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder="Enter your Name" onChange={handleChange}></input>
        <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
        <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={handleChange}></input>
        <input type="password" name="reEnterpassword" value={user.reEnterpassword} placeholder="Re-Enter your Password" onChange={handleChange}></input>

        <div className="button" onClick={register}>Register</div>
        <div>Or</div>
        <div className="button" onClick={handleNavigation}>Login</div>
      </div>
    </div>
  );
};

export default Register;
