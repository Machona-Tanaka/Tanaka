import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaSave, FaTimes, FaLock } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import '../../../assets/css/AuthPages.css';

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  console.log(userId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    isActive: true,
    resetPassword: false,
    newPassword: ''
  });

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await api.getUserProfile(userId);
        console.log(user);
        setFormData({
          name: user.data.username,
          email: user.data.email,
          phone: user.data.phone,
          role: user.data.user_role,
          isActive: user.data.account_status,
          resetPassword: false,
          newPassword: ''
        });
        console.log(formData);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

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

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill all required fields');
      return;
    }

    if (formData.resetPassword && formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const updateData = {
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        user_role: formData.role,
        account_status: formData.isActive
      };

      if (formData.resetPassword) {
        updateData.newPassword = formData.newPassword;
      }

      await api.updateUserById(userId, updateData);
      setSuccess('User updated successfully!');

      
      setTimeout(() => navigate('/admin/users'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="loading-spinner">Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card admin-edit-card">
        <div className="auth-header">
          <FaUserShield className="auth-logo" />
          <h2>Edit User</h2>
          <p>Update user information and permissions</p>
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
              placeholder="Phone Number"
              value={formData.phone}
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
              <option value="user">Regular User</option>
              <option value="editor">Editor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="checkbox-group">
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

          <div className="checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="resetPassword"
                checked={formData.resetPassword}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">Reset Password</span>
            </label>
          </div>

          {formData.resetPassword && (
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password (min 6 characters)"
                value={formData.newPassword}
                onChange={handleChange}
                minLength="6"
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/admin/users')}
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              className="auth-button"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;