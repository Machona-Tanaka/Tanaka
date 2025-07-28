import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaSave, FaTimes, FaLock } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/css/AuthPages.css';
import { Paper } from '@mui/material';

const ChangePassword = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Please fill all required fields');
      return;
    }

    if (formData.oldPassword.length < 6 || formData.confirmPassword.length < 6 || formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.newPassword != formData.newPassword){
        setError('Passwords do not match!');
        return;
    }

    try {

      console.log(userId);
      const updateData = {
        userId: userId,
        password: formData.oldPassword,
        newPassword : formData.newPassword,
      };

      const response = await api.changeAccountPassword(updateData);
      if (response.data.success){
        setSuccess('Password successfully changed.')
      }
      
    } catch (err) {
        if (err.response.status == 401){
            setError('Passwords do not match');
            return;   
        }
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };


  return (
    <>
    <Paper  elevation={0} sx={{  width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 2 }}>
      <div className="auth-card admin-edit-card">
        <div className="auth-header">
          <FaUserShield className="auth-logo" />
          <h2>Change User Password</h2>
          <p>Changing the User Password</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">


          {(
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="oldPassword"
                placeholder="Current Password (min 6 characters)"
                value={formData.oldPassword}
                onChange={handleChange}
                minLength="6"
              />
            </div>
          )}

          {(
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

          {(
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password (min 6 characters)"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="6"
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
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
   </Paper>
   </>
  );
};

export default ChangePassword;