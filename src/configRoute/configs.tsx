import React from "react";
import Dashboard from "../layouts/applayout/appbar";
import { lazy } from "react";
import { UserRole } from "../features/auth/types";

export const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../Pages/home/index")),
  },
  {
    path: "/login",
    // component: Login
    exact: false,
    component: lazy(() => import("../Pages/signup/login")),
  },
  {
    path: "/home",
    exact: false,
    component: lazy(() => import("../Pages/user/index")),
    bars: <Dashboard />,
    isPrivate: true,
    permission: [UserRole.ADMIN],
    routes: [
      {
        path: "/home/dashboard",
        exact: false,
        component: lazy(() => import("../Pages/admin/dashboard")),
      },
      {
        path: "/home/users",
        exact: false,
        component: lazy(() => import("../Pages/admin/users_list")),
      },
      {
        path: "/home/assign",
        exact: false,
        component: lazy(() => import("../Pages/admin/assign_users")),
      },
      {
        path: "/home/chat",
        exact: false,
        component: lazy(() => import("../Pages/admin/chat")),
      },
    ],
  },
  {
    path: "/sales",
    exact: false,
    component: lazy(() => import("../Pages/user/index")),
    // bar: <Appbar/>,
    isPrivate: true,
    permission: [UserRole.SALES_PERSON],
    routes: [
      {
        path: "/sales/verify",
        exact: false,
        component: lazy(() => import("../Pages/sales/paymentStatus")),
      },
      {
        path: "/sales/client",
        exact: false,
        component: lazy(() => import("../Pages/sales/client")),
      },
      {
        path: "/sales/subscription",
        exact: false,
        component: lazy(
          () => import("../Pages/sales/countDown/subscriptionDate")
        ),
      },
    ],
  },
  {
    path: "/tech",
    exact: false,
    component: lazy(() => import("../Pages/user/tech")),
    // bar: <Appbar/>,
    isPrivate: true,
    permission: [UserRole.TECH_SUPPORT],
  },
  {
    path: "/user",
    exact: false,
    component: lazy(() => import("../Pages/user/index")),
    // bar: <Appbar/>,
    isPrivate: true,
    permission: [UserRole.USER],
    routes:[
      {
        path: "/user/chat",
        exact: false,
        component: lazy(() => import("../Pages/clients/chat/index")),
      },
      {
        path: "/user/profile",
        exact: false,
        component: lazy(() => import("../Pages/clients/profile/index")),
      },
    ]
  },
  {
    path: "/redirecting",
  },
];
