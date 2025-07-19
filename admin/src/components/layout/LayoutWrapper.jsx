import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from './AdminLayout';

export const LayoutWrapper = ({ children }) => {
  const content = children || <Outlet />;
  
  return (
    <AdminLayout>
      {content}
    </AdminLayout>
  );
};

export default LayoutWrapper;
