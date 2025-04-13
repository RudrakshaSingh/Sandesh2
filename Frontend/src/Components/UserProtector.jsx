import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getUserProfile } from "../Redux/Slices/UserAuth";

const UserProtector = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userAuth);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    // If already verified or user exists, don't fetch again
    if (isVerified || user) return;
    
    // Don't start another verification if one is in progress
    if (isVerifying) return;
    
    // Start verification process
    setIsVerifying(true);
    const toastId = toast.loading("Verifying access...");

    dispatch(getUserProfile())
      .unwrap()
      .then(() => {
        toast.dismiss(toastId);
        setIsVerified(true);
      })
      .catch((error) => {
        // Show error toast only here, not during redirect
        toast.error(error.message || "Please log in", { id: toastId });
        setAuthFailed(true);
        setIsVerified(true); // Still mark as verified to prevent re-attempts
      })
      .finally(() => {
        setIsVerifying(false);
      });

    return () => toast.dismiss(toastId);
  }, [dispatch, user, isVerifying, isVerified]);

  // Show loading state only during initial verification
  if (isVerifying || (loading && !isVerified && !user)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Verifying access...</span>
      </div>
    );
  }

  // Redirect if no user after verification
  if (!user) {
    // Only show toast if not already shown during API error
    if (!authFailed) {
      toast.error("Please log in to access this page");
    }
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default UserProtector;