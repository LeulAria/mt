// DRAWER LIST ITEM
import React from "react";
import { UserRole } from "../features/auth/types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChatIcon from "@material-ui/icons/Chat";
import EmailIcon from "@material-ui/icons/Email";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { EmailOutlined } from "@material-ui/icons";

export const items: any = {
  [UserRole.ADMIN]: [
    {
      path: "/home/dashboard",
      title: "Dashboard",
      icon: function Dashboard(): JSX.Element {
        return <DashboardIcon />;
      },
    },
    {
      path: "/home/users",
      title: "Users",
      icon: function Dashboard(): JSX.Element {
        return <GroupIcon />;
      },
    },
    {
      path: "/home/assign",
      title: "Assign Users",
      icon: function Dashboard(): JSX.Element {
        return <AssignmentIndIcon />;
      },
    },
    {
      path: "/home/chat",
      title: "Chat",
      icon: function Dashboard(): JSX.Element {
        return <ChatIcon />;
      },
    },
    {
      path: "/home/notification",
      title: "Send Notificaitons",
      icon: function Dashboard(): JSX.Element {
        return <AddAlertIcon />;
      },
    },
  ],
  [UserRole.SALES_PERSON]: [
    {
      path: "/sales/client",
      title: "Users List",
      icon: function Dashboard(): JSX.Element {
        return <PersonIcon />;
      },
    },
    {
      path: "/sales/subscription",
      title: "Users List",
      icon: function Dashboard(): JSX.Element {
        return <VerifiedUserIcon />;
      },
    },
    {
      path: "/sales/notifications",
      title: "Send Notificaitons",
      icon: function Dashboard(): JSX.Element {
        return <AddAlertIcon />;
      },
    },
    {
      path: "/sales/chat",
      title: "Users List",
      icon: function Dashboard(): JSX.Element {
        return <EmailOutlined />;
      },
    },
  ],
  [UserRole.USER]: [
    {
      path: "/user/profile",
      title: "My Profile",
      icon: function Dashboard(): JSX.Element {
        return <PersonIcon />;
      },
    },
    {
      path: "/user/notifications",
      title: "Notification",
      icon: function Dashboard(): JSX.Element {
        return <EmailIcon />;
      },
    },
  ],
  [UserRole.TECH_SUPPORT]: [
    {
      path: "/tech/chat",
      title: "Chat",
      icon: function Dashboard(): JSX.Element {
        return <PersonIcon />;
      },
    },
    {
      path: "/tech/notification",
      title: "Notification",
      icon: function Dashboard(): JSX.Element {
        return <NotificationsActiveIcon />;
      },
    },
  ],
};
