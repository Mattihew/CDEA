import React, { FunctionComponent } from "react";
import { Route } from "react-router";

interface StatusProps {
  statusCode: number;
}

const Status: FunctionComponent<StatusProps> = ({ statusCode, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = statusCode;
      }
      return children;
    }}
  />
);
export default Status;
