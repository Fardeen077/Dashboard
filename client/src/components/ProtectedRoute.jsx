import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute component
 * Checks if user is authenticated in Redux state before rendering the component.
 * Redirects to /login if user is not authenticated.
 * 
 * Usage: <ProtectedRoute element={<Home />} />
 */
const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.auth.user);

  // Only allow access if Redux has authenticated user
  // (Redux is populated at app startup from localStorage)
  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
