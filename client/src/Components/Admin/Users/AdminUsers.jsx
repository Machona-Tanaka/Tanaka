import React, { useState } from 'react';
import UsersTable from './UsersTable';
import '../../../assets/css/AuthPages.css'
import api from '../../../services/api';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', role: 'admin', isActive: true },
    // ... more users
  ]);

  const loadData = async () => {
      try {
        const usersData = await api.getUsers();
        console.log(usersData.data);
        setUsers(usersData.data);
      } catch (err) {
        console.log(err);
       
      }
    };
    loadData();


  const handleEdit = (user) => {
    // Open edit modal or navigate to edit page
    console.log('Editing user:', user);
  };

  const handleDelete = (userId) => {
    // Confirm and delete user
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isActive: newStatus } : user
    ));
  };

  return (
    <>
    {/* Create New User -- Back Buttons */}
    <div className="admin-page">
      <UsersTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
    </>
  );
};

export default AdminUsersPage;