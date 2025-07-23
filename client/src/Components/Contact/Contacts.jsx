import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contacts-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you! Reach out through any of these channels.</p>
      </section>

      {/* Contact Methods Grid */}
      <section className="contact-methods">
        <div className="contact-card">
          <div className="contact-icon">
            <FaEnvelope />
          </div>
          <h3>Email Us</h3>
          <p>For general inquiries</p>
          <a href="mailto:contact@podmyth.com">contact@podmyth.com</a>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <FaPhone />
          </div>
          <h3>Call Us</h3>
          <p>Monday-Friday, 9am-5pm</p>
          <a href="tel:+18005551234">+1 (800) 555-1234</a>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <FaMapMarkerAlt />
          </div>
          <h3>Visit Us</h3>
          <p>Our headquarters</p>
          <address>123 Podcast Lane, Studio City, CA 91604</address>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <FaClock />
          </div>
          <h3>Office Hours</h3>
          <p>Monday-Friday: 9am-5pm</p>
          <p>Saturday-Sunday: Closed</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="form-container">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>

        <div className="map-container">
          <iframe
            title="PodMyth Headquarters"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.453943909711!2d-118.391583684784!3d34.14294498059579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2beb3c8b9f8b9%3A0x8a3b4a3f3b4a3f3b!2sStudio%20City%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-section">
        <h2>Connect With Us</h2>
        <div className="social-links">
          <a href="https://twitter.com/podmyth" className="social-icon twitter">Twitter</a>
          <a href="https://facebook.com/podmyth" className="social-icon facebook">Facebook</a>
          <a href="https://instagram.com/podmyth" className="social-icon instagram">Instagram</a>
          <a href="https://linkedin.com/company/podmyth" className="social-icon linkedin">LinkedIn</a>
          <a href="https://youtube.com/podmyth" className="social-icon youtube">YouTube</a>
        </div>
      </section>
    </div>
  );
};

export default Contacts;