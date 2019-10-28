import React from "react";
import Status from "./util/Status";
import Title from "./util/Title";

const NotFound = (): React.ReactElement => (
  <Title title="Not Found">
    <Status statusCode={404} />
    <h1>Page not found</h1>
  </Title>
);

export default NotFound;
