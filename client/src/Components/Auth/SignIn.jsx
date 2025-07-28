import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaPodcast, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/AuthPages.css';
import api from '../../services/api';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [status, setStatus] = useState({
    isLoading: false,
    error:null,
    success: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    // Prevent multiple submissions
    if (status.isLoading) return;
    
    setStatus({ isLoading: true, error: null, success: null });


    try {
      const response = await api.login({
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        // Store authentication data
        localStorage.setItem('authToken', response.data.token);
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        localStorage.setItem('user', JSON.stringify(response.data));
        
        setStatus({
          isLoading: false,
          success: 'Login successful! Redirecting...',
          error: null
        });
        
        // Navigate directly without timeout
        if (response.data.role == 'admin') {
          // localStorage.setItem('user', {'name': response.data.username, id: response.data.id});
          localStorage.setItem('userRole', response.data.role || 'admin'); // Default to admin if not provided
          return navigate('/admin/dashboard', { replace: true });
        }
       
      } else {
        
        setStatus({
          isLoading: false,
          error: response.data?.message || 'Login failed. Please try again.',
          success: null
        });
      }
    } catch (err) {
      let errorMessage = 'An error occurred during login';
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 403:
            errorMessage = 'Account not verified. Please check your email';
            break;
          case 429:
            errorMessage = 'Too many attempts. Please try again later';
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      }

      setStatus({
        isLoading: false,
        error: errorMessage,
        success: null
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaPodcast className="auth-logo" />
          <h2>Welcome Back to PodMyth</h2>
          <p>Sign in to access your podcasts and preferences</p>
        </div>

        {status.error &&<div className="auth-error">{status.error}</div> }
        {status.success && <div className="auth-success">{status.success}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button 
            
            className="auth-button" 
            disabled={status.isLoading}
          >
            {status.isLoading ? (
              <>
                <FaSpinner className="spin-icon" />
                Signing In...
              </>
            ) : 'Sign In'}
          </button>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>

        <div className="social-auth">
          <p>Or sign in with:</p>
          <div className="social-buttons">
            <button 
              type="button" 
              className="social-button google"
              onClick={() => window.location.href = `${api.baseURL}/auth/google`}
            >
              <img src="/google-icon.png" alt="Google" />
              Google
            </button>
            <button 
              type="button" 
              className="social-button apple"
              onClick={() => window.location.href = `${api.baseURL}/auth/apple`}
            >
              <img src="/apple-icon.png" alt="Apple" />
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;