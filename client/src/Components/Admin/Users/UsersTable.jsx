// import React, { useState } from 'react';
// import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import '../../../assets/css/AuthPages.css';

// const UsersTable = ({ users, onEdit, onDelete, onStatusChange }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;

//   // Filter users based on search term
//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.phone.includes(searchTerm)
//   );

//   // Sort users
//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'asc' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'asc' ? 1 : -1;
//     }
//     return 0;
//   });

//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleStatusChange = (userId, currentStatus) => {
//     onStatusChange(userId, !currentStatus);
//   };

//   return (
//     <div className="admin-table-container">
//       <div className="table-header">
//         <h2>
//           <FaUserShield className="header-icon" />
//           User Management
//         </h2>
//         <div className="search-box">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th onClick={() => requestSort('name')}>
//                 <FaUser className="th-icon" />
//                 Name {sortConfig.key === 'name' && (
//                   <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
//                 )}
//               </th>
//               <th onClick={() => requestSort('email')}>
//                 <FaEnvelope className="th-icon" />
//                 Email {sortConfig.key === 'email' && (
//                   <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
//                 )}
//               </th>
//               <th onClick={() => requestSort('phone')}>
//                 <FaPhone className="th-icon" />
//                 Phone {sortConfig.key === 'phone' && (
//                   <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
//                 )}
//               </th>
//               <th>
//                 <FaUserShield className="th-icon" />
//                 Role
//               </th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.length > 0 ? (
//               currentUsers.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone}</td>
//                   <td>
//                     <span className={`role-badge ${user.role}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td>
//                     <label className="switch">
//                       <input
//                         type="checkbox"
//                         checked={user.isActive}
//                         onChange={() => handleStatusChange(user.id, user.isActive)}
//                       />
//                       <span className="slider round"></span>
//                     </label>
//                   </td>
//                   <td className="actions">
//                     <button
//                       onClick={() => onEdit(user)}
//                       className="edit-btn"
//                       title="Edit user"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => onDelete(user.id)}
//                       className="delete-btn"
//                       title="Delete user"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="no-users">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersTable;


import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUserShield, 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaChevronUp, 
  FaChevronDown,
  FaBars
} from 'react-icons/fa';
import '../../../assets/css/AuthPages.css';
import { useNavigate } from 'react-router-dom';

const UsersTable = ({ users, onDelete, onStatusChange }) => {

  const navigate = useNavigate();
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const usersPerPage = 10;

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  function renderEdit(id){
    navigate(`/admin/users/edit/${id}`,{ replace: true });
  }

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.includes(searchTerm) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Render sort indicator
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FaChevronUp /> : <FaChevronDown />;
  };

  // Render desktop table
  const renderDesktopTable = () => (
    <table className="users-table">
      <thead>
        <tr>
          <th onClick={() => requestSort('name')}>
            <div className="th-content">
              <FaUser className="th-icon" />
              Name
              {renderSortIcon('name')}
            </div>
          </th>
          <th onClick={() => requestSort('email')}>
            <div className="th-content">
              <FaEnvelope className="th-icon" />
              Email
              {renderSortIcon('email')}
            </div>
          </th>
          <th onClick={() => requestSort('phone')}>
            <div className="th-content">
              <FaPhone className="th-icon" />
              Phone
              {renderSortIcon('phone')}
            </div>
          </th>
          <th onClick={() => requestSort('role')}>
            <div className="th-content">
              <FaUserShield className="th-icon" />
              Role
              {renderSortIcon('role')}
            </div>
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <span className={`role-badge ${user.role}`}>
                {user.role}
              </span>
            </td>
            <td>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={user.isActive}
                  onChange={() => onStatusChange(user.id, !user.isActive)}
                />
                <span className="slider round"></span>
              </label>
            </td>
            <td className="actions">
              <button
                onClick={() => renderEdit(user.id)}
                className="edit-btn"
                aria-label={`Edit ${user.name}`}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="delete-btn"
                aria-label={`Delete ${user.name}`}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Render mobile cards
  const renderMobileCards = () => (
    <div className="mobile-users-list">
      {currentUsers.map((user) => (
        <div key={user.id} className="mobile-user-card">
          <div className="card-header">
            <FaUser className="user-icon" />
            <div className="user-info">
              <h3>{user.name}</h3>
              <span className={`role-badge ${user.role}`}>
                {user.role}
              </span>
            </div>
          </div>
          
          <div className="card-details">
            <div className="detail-row">
              <FaEnvelope className="detail-icon" />
              <span>{user.email}</span>
            </div>
            <div className="detail-row">
              <FaPhone className="detail-icon" />
              <span>{user.phone}</span>
            </div>
            <div className="detail-row">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={user.isActive}
                  onChange={() => onStatusChange(user.id, !user.isActive)}
                />
                <span className="slider round"></span>
              </label>
              <span className="status-text">
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          
          <div className="card-actions">
            <button
              onClick={() => renderEdit(user.id)}
              className="edit-btn"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="delete-btn"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="admin-table-container">
      <div className="table-header">
        <h2>
          <FaUserShield className="header-icon" />
          User Management
        </h2>
        
        <div className="controls">
          {isMobile && (
            <button 
              className="mobile-search-toggle"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
            >
              <FaSearch />
            </button>
          )}
          
          <div className={`search-box ${showSearch ? 'mobile-visible' : ''}`}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search users"
            />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        {filteredUsers.length === 0 ? (
          <div className="no-users">
            No users found matching your search
          </div>
        ) : isMobile ? (
          renderMobileCards()
        ) : (
          renderDesktopTable()
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersTable;