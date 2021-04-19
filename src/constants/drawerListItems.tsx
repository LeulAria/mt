// DRAWER LIST ITEM
import React from "react";
import { UserRole } from "../features/auth/types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChatIcon from "@material-ui/icons/Chat";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EmailIcon from "@material-ui/icons/Email";
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
  ],
  [UserRole.SALES_PERSON]: [
    // {
    //   path: "/sales/verify",
    //   title: "Verify Users",
    //   icon: function Dashboard(): JSX.Element {
    //     return <VerifiedUserIcon />;
    //   },
    // },
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
        return <EmailIcon />;
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
    // {
    //   path: "/user/chat",
    //   title: "Chat",
    //   icon: function Dashboard(): JSX.Element {
    //     return <ChatIcon />;
    //   },
    // },
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
};
