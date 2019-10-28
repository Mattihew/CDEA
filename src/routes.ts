import { RouteProps } from "react-router";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    component: NotFound
  }
];

export default routes;
