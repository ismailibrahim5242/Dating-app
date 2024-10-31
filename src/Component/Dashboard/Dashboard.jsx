import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaUpload, FaChevronDown } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    const user = users.find((user) => user.email === loggedInUserEmail);

    if (user) {
      setUsername(user.username);
      setUserEmail(user.email);
      setPassword(user.password);

      const storedProfilePicture = localStorage.getItem(
        `profilePicture_${user.email}`
      );
      if (storedProfilePicture) {
        setProfilePicture(storedProfilePicture);
      }
    }
  }, []);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfilePicture(base64Image);

        const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
        if (loggedInUserEmail) {
          localStorage.setItem(
            `profilePicture_${loggedInUserEmail}`,
            base64Image
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
      localStorage.removeItem(`profilePicture_${loggedInUserEmail}`);
      setProfilePicture(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserEmail");
    navigate("/user/login");
  };

  const handleDeactivateAccount = () => {
    const confirmation = window.confirm(
      "Are you sure you want to deactivate this account?"
    );

    if (confirmation) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

      const updatedUsers = users.filter(
        (user) => user.email !== loggedInUserEmail
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      localStorage.removeItem(`profilePicture_${loggedInUserEmail}`);
      handleLogout();
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-right">
          <span className="username">Welcome, {username}</span>

          <button
            className="dashboard-button"
            onClick={() =>
              setShowNotificationDropdown(!showNotificationDropdown)
            }
          >
            Notifications <FaChevronDown className="dropdown-indicator" />
          </button>

          <button
            className="dashboard-button"
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
          >
            Settings <FaChevronDown className="dropdown-indicator" />
          </button>

          <div className="account-dropdown-container">
            <button
              className="dashboard-button"
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            >
              Account <FaChevronDown className="dropdown-indicator" />
            </button>

            {showAccountDropdown && (
              <div className="account-dropdown">
                <p>
                  <strong>Email:</strong> {userEmail}
                </p>
                <p>
                  <strong>Password:</strong> {"•".repeat(8)}
                </p>
                <button
                  className="deactivate-button"
                  onClick={handleDeactivateAccount}
                >
                  Deactivate Account
                </button>
              </div>
            )}
          </div>

          {showSettingsDropdown && (
            <div className="settings-dropdown">
              <button
                className="dropdown-item"
                onClick={() => console.log("Edit Profile")}
              >
                Edit Profile
              </button>
              <button
                className="dropdown-item"
                onClick={() => console.log("Security")}
              >
                Security
              </button>
              <button
                className="dropdown-item"
                onClick={() => console.log("Biometric")}
              >
                Biometric
              </button>
            </div>
          )}

          {showNotificationDropdown && (
            <div className="Notification-dropdown">
              <button
                className="dropdown-item"
                onClick={() => console.log("Push Notification")}
              >
                Push Notification
              </button>
              <button
                className="dropdown-item"
                onClick={() => console.log("Email Notification")}
              >
                Email Notification
              </button>
              <button
                className="dropdown-item"
                onClick={() => console.log("Sms Notification")}
              >
                Sms Notification
              </button>
            </div>
          )}

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        <div className="profile-section">
          <div className="profile-picture">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture-img"
              />
            ) : (
              <div className="default-profile-picture">
                <FaUpload /> No Image
              </div>
            )}
          </div>

          {/* Edit and Delete Buttons below the profile picture */}
          <div className="profile-picture-actions">
            <label className="icon-button change-button">
              <FaEdit /> Change
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                style={{ display: "none" }}
              />
            </label>
            <button
              className="icon-button delete-button"
              onClick={handleDeleteProfilePicture}
            >
              <FaTrashAlt /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
