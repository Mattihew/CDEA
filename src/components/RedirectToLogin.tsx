import React from "react";
import { Redirect, useLocation } from "react-router";

const RedirectToLogin = (): React.ReactElement => {
  const location = useLocation();
  return <Redirect to={{ pathname: "/login", state: { referrer: location } }} />;
};

export default RedirectToLogin;
