import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const DashboardProtectedRoute = ({ children }) => {
  const [showError, setShowError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setRedirect(true); // Set redirect to true after the timeout
      }, 2000); // Show the error banner for 2 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [showError]);

  if (!accessToken) {
    // Redirect to login if there is no access token
    return <Navigate to="/dashboard/login" />;
  }

  if (user && user.userName === 'root.admin') {
    return children; // Allow access if the user is an admin
  } else {
    if (!showError) setShowError(true); // Trigger the error message
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
      <>
        {showError && (
            <div className="alert alert-danger" role="alert">
              You are not logged in as admin. You will be routed to the home page.
            </div>
        )}
      </>
  );
};

export default DashboardProtectedRoute;
