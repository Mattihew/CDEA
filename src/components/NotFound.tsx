import React from "react";
import Page from "./Page";
import Status from "./util/Status";
import Title from "./util/Title";

const NotFound = (): React.ReactElement => (
  <Page>
    <Title title="Not Found" />
    <Status statusCode={404} />
    <h1>404</h1>
    <h2>Page not found</h2>
  </Page>
);

export default NotFound;
