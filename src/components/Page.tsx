import { Container } from "@material-ui/core";
import React from "react";

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps): React.ReactElement => {
  return <Container>{children}</Container>;
};
export default Page;
