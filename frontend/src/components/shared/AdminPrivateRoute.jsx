import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AdminPrivateRoute = () => {
  // Get current user from Redux store
  const currentUser = useSelector((state) => state.user?.currentUser);

  // Check if user is an admin, otherwise redirect to sign-in page
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

// Add PropTypes for better type safety
AdminPrivateRoute.propTypes = {
  currentUser: PropTypes.shape({
    isAdmin: PropTypes.bool,
  }),
};

export default AdminPrivateRoute;
