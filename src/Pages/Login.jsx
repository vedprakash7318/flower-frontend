import React, { useState } from "react";
import "./CSS/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_APi_Url
  const handleLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${API_URL}/api/login`, {
        email, password
      })
      if (res.data.success == true) {
        localStorage.setItem("token",res?.data?.admin?._id)
        
        toast("Login Successfully");
        setLoading(false)
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      }
      else {
        alert('Invalid Email or Password')
      }

    } catch (error) {
      console.log(error);

    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className="Login-main">

      <div className="Login-card">

        <div className="Login-left">
          <h1 className="Login-brand">Welcome Back</h1>
          <p className="Login-text">
            Login to access your admin dashboard and manage your products.
          </p>
        </div>

        <div className="Login-right">

          <h2 className="Login-heading">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="Login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="Login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="Login-btn" onClick={handleLogin} disabled={loading}>
            {loading?"Loading":"Login"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Login;