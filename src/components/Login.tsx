import { parse } from "query-string";
import React from "react";
import { Redirect, useLocation } from "react-router";
import { useRole, UserRoles } from "../utils/userRoles";

const Login = (): React.ReactElement => {
  const { state, search } = useLocation();
  const { referrer } = parse(search);
  const currentRole = useRole();
  if (currentRole > UserRoles.None) {
    return <Redirect to={state?.referrer || referrer || "/"} />;
  } else {
    return <div>login</div>;
  }
};

export default Login;
