import { CssBaseline } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import Title from "./components/util/Title";
import routes from "./routes";
import { useRole, UserRoles } from "./utils/userRoles";

const App: FunctionComponent = () => {
  const currentRole = useRole();
  return (
    <React.StrictMode>
      <CssBaseline />
      <Switch>
        {routes.map(({ title, children, role = UserRoles.User, ...route }, i) => {
          if (currentRole >= role) {
            return (
              <Route key={i} {...route}>
                {title && <Title title={title} />}
                {children}
              </Route>
            );
          } else {
            return null;
          }
        })}
      </Switch>
    </React.StrictMode>
  );
};

export default App;
