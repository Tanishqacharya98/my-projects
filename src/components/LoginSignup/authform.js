import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './authform.css';
import axios from 'axios';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:5000/api/login'
      : 'http://localhost:5000/api/signup';
    const body = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await axios.post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = res.data;

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        alert('Login successful!');
        window.location.href =  '/';
      } else {
        alert('Signup successful! Now login.');
        setIsLogin(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      alert(msg);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('role');

      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      alert('Logout failed');
    }
  };

  return (
    <div className="auth-page-fancy">
      <div className="auth-glass-card">
        <h2 className="glow-title">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
                <label>Name</label>
              </div>
              <div className="input-box select-box">
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <div className="input-box">
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <button type="submit" className="fancy-btn">
            {isLogin ? 'Login ' : 'Sign Up '}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="form-switch">
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </p>

        {localStorage.getItem('token') && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={handleLogout} className="fancy-btn" style={{ backgroundColor: 'red' }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
