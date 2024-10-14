import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    const user = users.find(user => user.email === loggedInUserEmail);
    
    if (user) {
      setUsername(user.username); 
    } else {
      console.error("No user found");
    }
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard:  {username}</h1>
    </div>
  );
};

export default Dashboard;
