import React from "react";
import { RouteProps } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import RedirectToLogin from "./components/RedirectToLogin";
import { UserRoles } from "./utils/userRoles";

interface Group {
  name: string;
}

type GroupNames = "test";
const groups: Readonly<{ [N in GroupNames]: Readonly<Group> }> = {
  test: {
    name: "test"
  }
} as const;

interface RouteInfo extends Readonly<Omit<RouteProps, "render" | "component">> {
  title?: string;
  group?: keyof typeof groups;
  role?: UserRoles;
}

const routes: readonly RouteInfo[] = [
  {
    title: "CDEA",
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    title: "Admin",
    path: "/admin",
    children: <div>Admin Page</div>,
    group: "test",
    role: UserRoles.Admin
  },
  {
    title: "Login",
    path: "/login",
    children: <Login />,
    role: UserRoles.None
  },
  {
    title: "404 - Page not found",
    children: <NotFound />,
    role: UserRoles.User
  },
  {
    children: <RedirectToLogin />,
    role: UserRoles.None
  }
] as const;

export default routes;
export { groups };
