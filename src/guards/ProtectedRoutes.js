import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import {
  selectIsAuthenticated,
} from '../redux/slices/auth';

export default function ProtectedRoutes({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
 
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  
 return children;
}