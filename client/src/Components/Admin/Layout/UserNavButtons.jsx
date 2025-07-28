import { FaUsers, FaUser, FaUserEdit, FaBackward } from 'react-icons/fa';
import { user } from '../../../utils/authUtils';
import './css/Navigation.scss'; // Link-specific styles
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const NavigationButtons = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(user());

    return (
        <div className="user-management-links">
            <NavLink to="users/create" className="user-management-link">
                <FaUser className="user-management-link-icon" />
                <span>Create User</ span>
            </NavLink>
            <NavLink to={"user/change/password/" + userData.id} className="user-management-link">
                <FaUserEdit className="user-management-link-icon" />
                <span>Change Password</span>
            </NavLink>
            <NavLink to={"users"} className="user-management-link">
                <FaUsers  className="user-management-link-icon" />
                <span>Users Table</span>
            </NavLink>
            <a onClick = {() => navigate(-1)} className="user-management-link">
                <FaBackward className="user-management-link-icon" />
                <span>Back</span>
            </a>
        </div>
    );
}

export default NavigationButtons;