// src/guards/AuthenticatedGuard.tsx
import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedGuard: React.FC = (): JSX.Element => {
  const token = Cookies.get('accessToken');

  if (token == null || token === '') {
    return <Navigate to='/auth/login' replace />;
  }

  return <Outlet />;
};

export default AuthenticatedGuard;
