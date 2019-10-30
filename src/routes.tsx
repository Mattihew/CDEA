import React from "react";
import { RouteProps } from "react-router";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

type RouteInfo = RouteProps & {
  title?: string;
};

const routes: RouteInfo[] = [
  {
    title: "CDEA",
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    title: "404 - Page not found",
    children: <NotFound />
  }
];

export default routes;
