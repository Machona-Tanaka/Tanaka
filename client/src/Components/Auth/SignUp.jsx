import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaPodcast } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/css/AuthPages.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic
    console.log({ name, email, password, confirmPassword });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaPodcast className="auth-logo" />
          <h2>Join PodMyth Community</h2>
          <p>Create your account to discover amazing podcasts</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <FaPhone className="input-icon" />
            <input
              type="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="terms-agreement">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
          </div>
        </form>

        <div className="social-auth">
          <p>Or sign up with:</p>
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

export default SignUp;