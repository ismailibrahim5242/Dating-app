import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaHome, FaComments, FaCamera, FaBell, FaCog } from 'react-icons/fa';
import './HomePage.css'

const HomePage = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-item">
          <FaHome className="icon" />
          <span>Home</span>
        </Link>
        <Link to="/chat" className="navbar-item">
          <FaComments className="icon" />
          <span>Chat</span>
        </Link>
        <Link to="/picture" className="navbar-item">
          <FaCamera className="icon" />
          <span>Picture</span>
        </Link>
        <Link to="/notifications" className="navbar-item">
          <FaBell className="icon" />
          <span>Notification</span>
        </Link>
        <Link to="/settings" className="navbar-item">
          <FaCog className="icon" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to the Homepage</h1>
      </div>
    </div>
  );
};

export default HomePage;
