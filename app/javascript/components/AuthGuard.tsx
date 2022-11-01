import React, { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useAuthentication } from "./AuthProvider";

const AuthGuard: FC<{ children: ReactNode }> = (props) => {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return <>{props.children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
