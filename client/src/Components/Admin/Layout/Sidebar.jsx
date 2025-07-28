import { NavLink } from 'react-router-dom';
import { user, logout }  from '../../../utils/authUtils';
import './css/layout.scss'
import { 
  FaTachometerAlt, 
  FaNewspaper, 
  FaPodcast, 
  FaBook,
  FaTshirt,
  FaComment,
  FaUsers,
  FaChartLine,
  FaCog,
  FaUserEdit,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  // const userData = localStorage.getItem('userData');
  // const userId = userData.id;
  const userData = user();
  const user2 = JSON.parse(userData);

  return (
  <>

      <nav className="sidebar-nav">
        <NavLink to="dashboard" activeClassName="active">
          <FaTachometerAlt /><span>Dashboard</span>
        </NavLink>
        <NavLink to="articles" activeClassName="active">
          <FaNewspaper /><span>Articles</span>
        </NavLink>
        <NavLink to="podcasts" activeClassName="active">
          <FaPodcast /><span>Podcasts</span>
        </NavLink>
        <NavLink to="guides" activeClassName="active">
          <FaBook /><span>Guides</span>
        </NavLink>
        <NavLink to="products" activeClassName="active">
          <FaTshirt /><span>Products</span>
        </NavLink>
        <NavLink to="comments" activeClassName="active">
          <FaComment /><span>Comments</span>
        </NavLink>
        <NavLink to="users" activeClassName="active">
          <FaUsers /><span>Users</span>
        </NavLink>
        <NavLink to="analytics" activeClassName="active">
          <FaChartLine /><span>Analytics</span>
        </NavLink>
        <NavLink to={  `/admin/user/change/password/${user2.id}`} activeClassName="active">
          <FaUserEdit /><span>Change Password</span>
        </NavLink>
        <NavLink to="settings" activeClassName="active">
          <FaCog /><span>Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        {user && (
          <button onClick={logout} className="logout-btn">
            <FaSignOutAlt /><span>Logout</span>
          </button>
        )}
      </div>
  </>
  );
};

export default Sidebar;