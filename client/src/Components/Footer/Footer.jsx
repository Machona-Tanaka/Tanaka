import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa'
import '../../assets/css/Footer.css'

const Footer = () => {
  return (

    // <!-- Footer -->
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-brand">
                <a href="#">PodMyth</a>
                <p>Your gateway to the podcast universe</p>
                <div className="social-links">
                    <a href="#"><FaFacebookF/></a>
                    <a href="#"><FaTwitter/></a>
                    <a href="#"><FaInstagram/></a>
                    <a href="#"><FaSpotify/></a>
                    <a href="#"><FaYoutube/></a>

                </div>
            </div>
            <div className="footer-links">
                <div className="footer-column">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="#">Podcasts</a></li>
                        <li><a href="#">Articles</a></li>
                        <li><a href="#">Merch</a></li>
                        <li><a href="#">Guides</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Company</h4>
                    <ul>
                         <li><a href="#">Team</a></li>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">PodGuide</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Feedback</a></li>
                        <li><a href="#">Community Guidelines</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 PodMyth. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
