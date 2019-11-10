import React from "react";
import { RouteProps } from "react-router";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

type RouteInfo = Readonly<
  RouteProps & {
    title?: string;
  }
>;

const routes: Readonly<RouteInfo[]> = [
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
] as const;

export default routes;
