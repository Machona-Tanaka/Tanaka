import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserShield, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../../assets/css/AuthPages.css';
import api from '../../../services/api';

const AdminCreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    isActive: true
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'user', label: 'Regular User' },
    { value: 'editor', label: 'Editor' },
    { value: 'admin', label: 'Administrator' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Invalid email format');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post('/admin/users', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        isActive: formData.isActive
      });
      if (response){
        setSuccess(`User created successfully! Role: ${formData.role}`);
      }
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        isActive: true
      });
      
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Email already exists');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.response?.data?.message || 'User creation failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card admin-card">
        <div className="auth-header">
          <FaUserShield className="auth-logo" />
          <h2>Create New User</h2>
          <p>Add a new user to the system with specific permissions</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (10 digits)"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="\d{10}"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUserShield className="input-icon" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
              required
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div className="terms-agreement">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">Active Account</span>
            </label>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating User...' : 'Create User'}
            </button>
            
            <Link to="/admin/users" className="cancel-button">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateUser;