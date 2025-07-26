import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaPodcast } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/css/AuthPages.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaPodcast className="auth-logo" />
          <h2>Welcome Back to PodMyth</h2>
          <p>Sign in to access your podcasts and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Sign In
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
            <button className="social-button google">
              <img src="/google-icon.png" alt="Google" />
              Google
            </button>
            <button className="social-button apple">
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