import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { UserRole } from "../../../features/auth/types";
import Chat from "../../clients/chat/index";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccManager from "../../../components/acc_manager";
import Notification from "./notification";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const drawerWidth = 440;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 1,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      maxWidth: window.innerWidth - 450,
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      // padding: theme.spacing(1),
    },
  })
);

export default function PermanentDrawerRight() {
  const classes = useStyles();
  const role = useSelector((state: RootState) => state.auth.currentUser.role);

  return (
    // <div className={classes.root}>
    <>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AccManager />
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <Notification />
      </Drawer>
      {role === UserRole.USER ? <Chat /> : null}
    </>
    // </div>
  );
}
