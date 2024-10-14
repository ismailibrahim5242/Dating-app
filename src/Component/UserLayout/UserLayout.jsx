import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default UserLayout;
