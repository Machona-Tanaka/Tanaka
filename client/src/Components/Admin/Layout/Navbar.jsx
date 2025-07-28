import { user } from '../../../utils/authUtils';

const Navbar = () => {
  const userInfo = user;
  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* <h1 className="dashboard-title">Admin Dashboard</h1> */}
      </div>
      <div className="navbar-right">
        {userInfo && (
          <div className="user-info">
            <span className="username">{userInfo.username}</span>
            <div className="avatar-container">
              <img 
                src={userInfo.avatar || '/default-avatar.png'} 
                alt="User" 
                className="user-avatar"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/default-avatar.png'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;