import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; // If using React Router
import { Paper } from '@mui/material';

import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
const NavigationButtons = React.lazy(() => import('./UserNavButtons'));
// import { Box, CssBaseline } from '@mui/material';

const Layout = ({ user, logout }) => {
  
  const [isHidden, setIsHidden] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  const toggleSidebar = () => setIsHidden(!isHidden);
  const toggleMobileSidebar = () => setMobileVisible(!mobileVisible);

  const [containsUser, setContainsUser] = useState(false);
  const location = useLocation(); // React Router hook

  useEffect(() => {
    // For React Router (clean path without query params)
    const hasUser = location.pathname.toLowerCase().includes('user');
    
    // For full URL including query params:
    // const hasUser = window.location.href.toLowerCase().includes('user');
    
    setContainsUser(hasUser);
  }, [location]);

  return (
    <>

      <Navbar />
      {/* Mobile menu button (only visible on small screens) */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMobileSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isHidden ? 'hidden' : ''} ${mobileVisible ? 'visible-mobile' : ''}`}>
        

        <div className="sidebar-header">
          <h3><span>Admin Dashboard</span></h3>
        </div>
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
        >
          {isHidden ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        <nav className="sidebar-nav">
           <Sidebar />
        </nav>
        
        <div className="sidebar-footer">
          {user && (
            <button onClick={logout} className="logout-btn">
              <FaSignOutAlt /><span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className={`main-content ${isHidden ? 'sidebar-hidden' : ''}`}>

          {containsUser ? (
           <NavigationButtons />
          ) : (
            ''
          )}
        <Paper  elevation={0} sx={{  width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 2 }}></Paper>
          <Outlet />
        <Paper />
      </div>
      <Footer />

      
    </>
    );
};

export default Layout;