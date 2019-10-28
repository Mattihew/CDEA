import React from "react";
import { Container } from "@material-ui/core";
import { useTitle } from "./util/Title";

const Home = (): React.ReactElement => {
  useTitle("CDEA!");
  return (
    <>
      <Container>
        <h1>CDEA!</h1>
      </Container>
    </>
  );
};
export default Home;
