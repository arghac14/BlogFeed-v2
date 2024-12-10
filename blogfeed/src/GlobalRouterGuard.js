import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './store/slices/userSlice'; // Adjust the path to your userSlice

// GuardedRoute Component
const GuardedRoute = ({ needsAuth, children }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation(); 

  useEffect(() => {
    // Check localStorage and sync Redux state if not already set
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    if (!user && storedUser && accessToken) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [location, user]);

  // Redirect if authentication is required but the user is not authenticated
  if (needsAuth && !user) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if all checks pass
  return children;
};

export default GuardedRoute;
