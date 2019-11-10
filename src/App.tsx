import { CssBaseline } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import routes from "./routes";
import Title from "./components/util/Title";

const App: FunctionComponent = () => (
  <React.StrictMode>
    <CssBaseline />
    <Switch>
      {routes.map(({ title, children, ...route }, i) => (
        <Route key={i} {...route}>
          {title && <Title title={title} />}
          {children}
        </Route>
      ))}
    </Switch>
  </React.StrictMode>
);

export default App;
