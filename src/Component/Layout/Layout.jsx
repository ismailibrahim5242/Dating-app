import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <>
    <Outlet/>
    </>
  );
};

export default Layout;
