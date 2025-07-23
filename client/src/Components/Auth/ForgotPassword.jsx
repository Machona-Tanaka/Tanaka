import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft, FaPodcast } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AuthPages.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic
    setMessage(`Reset link sent to ${email}`);
    console.log({ email });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaPodcast className="auth-logo" />
          <h2>Reset Your Password</h2>
          <p>Enter your email to receive a reset link</p>
        </div>

        {message ? (
          <div className="success-message">
            <p>{message}</p>
            <Link to="/signin" className="auth-button">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
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

              <button type="submit" className="auth-button">
                Send Reset Link
              </button>
            </form>

            <div className="auth-footer">
              <Link to="/signin" className="back-to-login">
                <FaArrowLeft /> Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;