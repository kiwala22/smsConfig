import PropTypes from "prop-types";
import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "./AuthProvider";

const GuestGuard: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated) {
    return <Navigate replace to={"/"} />;
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
