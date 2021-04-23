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
    path: "/signup",
    // component: Login
    exact: false,
    component: lazy(() => import("../Pages/signup/signUp")),
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
      {
        path: "/home/notification",
        exact: false,
        component: lazy(() => import("../Pages/admin/notification")),
      },
      {
        path: "/home/*",
        exact: false,
        component: lazy(() => import("../components/not_found/index")),
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
      {
        path: "/sales/notifications",
        exact: false,
        component: lazy(() => import("../Pages/sales/notifications/index")),
      },
      {
        path: "/sales/chat",
        exact: false,
        component: lazy(() => import("../Pages/sales/chat/index")),
      },
      {
        path: "/sales/*",
        exact: false,
        component: lazy(() => import("../components/not_found/index")),
      },
    ],
  },
  {
    path: "/tech",
    exact: false,
    component: lazy(() => import("../Pages/user/index")),
    // bar: <Appbar/>,
    isPrivate: true,
    permission: [UserRole.TECH_SUPPORT],
    routes: [
      {
        path: "/tech/chat",
        exact: false,
        component: lazy(() => import("../Pages/tech/chat/index")),
      },
      {
        path: "/tech/notification",
        exact: false,
        component: lazy(
          () => import("../Pages/tech/notification/notification")
        ),
      },
      // {
      //   path: "/user/notifications",
      //   exact: false,
      //   component: lazy(() => import("../Pages/clients/notification/index")),
      // },
    ],
  },
  {
    path: "/user",
    exact: false,
    component: lazy(() => import("../Pages/clients/profile/index")),
    isPrivate: true,
    permission: [UserRole.USER],
    routes: [
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
      {
        path: "/user/notifications",
        exact: false,
        component: lazy(() => import("../Pages/clients/notification/index")),
      },
      {
        path: "/user/*",
        exact: false,
        component: lazy(() => import("../components/not_found/index")),
      },
    ],
  },
  {
    path: "/redirecting",
  },
  {
    path: "*",
    exact: false,
    component: lazy(() => import("../components/not_found/index")),
  },
];
