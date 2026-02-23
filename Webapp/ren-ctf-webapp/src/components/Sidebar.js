// Sidebar.js
import React from 'react';
import { FaHome, FaUserFriends, FaComments, FaBell, FaCog } from 'react-icons/fa';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Logo</div>
      <div className="menu-item">
        <FaHome className="icon" />
        <span>Home</span>
      </div>
      <div className="menu-item">
        <FaUserFriends className="icon" />
        <span>Friends</span>
      </div>
      <div className="menu-item">
        <FaComments className="icon" />
        <span>Messages</span>
      </div>
      <div className="menu-item">
        <FaBell className="icon" />
        <span>Notifications</span>
      </div>
      <div className="menu-item">
        <FaCog className="icon" />
        <span>Settings</span>
      </div>
    </div>
  );
};

export default Sidebar;
