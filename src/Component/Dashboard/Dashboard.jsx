import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    const user = users.find(user => user.email === loggedInUserEmail);
    
    if (user) {
      setUsername(user.username); 
      setUserEmail(user.email);  
      setPassword(user.password); 

      const storedProfilePicture = localStorage.getItem(`profilePicture_${user.email}`);
      if (storedProfilePicture) {
        setProfilePicture(storedProfilePicture);
      }
    } else {
      console.error("No user found");
    }
  }, []);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfilePicture(base64Image);

        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        if (loggedInUserEmail) {
          localStorage.setItem(`profilePicture_${loggedInUserEmail}`, base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    if (loggedInUserEmail) {
      localStorage.removeItem(`profilePicture_${loggedInUserEmail}`);
      setProfilePicture(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    navigate('/user/login');
  };

  const handleDeactivateAccount = () => {
    const confirmation = window.confirm("Are you sure you want to deactivate this account?");
    
    if (confirmation) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
      
      const updatedUsers = users.filter(user => user.email !== loggedInUserEmail);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      localStorage.removeItem(`profilePicture_${loggedInUserEmail}`);

      handleLogout();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {username}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="profile-section">
        <div className="profile-picture">
          {profilePicture ? (
            <>
              <img src={profilePicture} alt="Profile" className="profile-picture-img" />
              {/* Change and Delete buttons */}
              <div className="profile-picture-actions">
                <button className="change-button">
                  <label htmlFor="file-input">Change</label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePictureUpload}
                    style={{ display: 'none' }}
                  />
                </button>
                <button className="delete-button" onClick={handleDeleteProfilePicture}>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="default-profile-picture">
              No Image
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                className="file-input"
              />
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-menu">
        <button 
          className="dashboard-button" 
          onClick={() => setShowAccountDropdown(!showAccountDropdown)}
        >
          Account
        </button>
        
        {showAccountDropdown && (
          <div className="account-dropdown">
            <p><strong>Email:</strong> {userEmail}</p>
            <p><strong>Password:</strong> {'•'.repeat(8)}</p>
            <button className="deactivate-button" onClick={handleDeactivateAccount}>
              Deactivate Account
            </button>
          </div>
        )}

        <button className="dashboard-button" onClick={() => console.log("Settings opened")}>
          Settings
        </button>
        <button className="dashboard-button" onClick={() => console.log("Notifications opened")}>
          Notifications
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
