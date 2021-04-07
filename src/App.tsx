import React, { lazy, Suspense } from 'react';
import AppBar from "./layouts/applayout/appbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles, Theme, createStyles, ThemeProvider } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { theme } from "./app/theme"



const RegisterUser = lazy(() => import("./Pages/signup/registration"))

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LinearProgress color="primary" />}>
          <BrowserRouter>
            <AppBar />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route path="/" component={RegisterUser} exact />
              </Switch>
            </main>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

