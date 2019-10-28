import { CssBaseline } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import routes from "./routes";

const App: FunctionComponent = () => (
  <React.Fragment>
    <CssBaseline />
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>
  </React.Fragment>
);

export default App;
