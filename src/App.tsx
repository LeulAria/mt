import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch } from "react-router-dom";
import { makeStyles, Theme, createStyles, ThemeProvider } from '@material-ui/core/styles';
import { routes } from "./configRoute/configs";
import Router from "./configRoute/routeSubRoute";
import { theme } from "./app/theme"
import Appbar from "./layouts/applayout/appbar";
import { RootState } from './app/store';
import { useSelector } from 'react-redux';

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
      // padding: theme.spacing(3),
    },
  }),
);

export const App = () => {
  const classes = useStyles();
  const auth = useSelector((state: RootState) => state.auth)
  const [appState, setAppState] = useState<boolean>(false)
  useEffect(() => {
    checkRoutes()
  }, [auth.authenticated])
  const routeDef: string[] = [
    '/login',
    '/'
  ]
  const checkRoutes = () => {
     setAppState(routeDef.includes(location.pathname))
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <BrowserRouter>
          {
            !appState && <Appbar />
          }
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {
                routes.map((value, index) => (
                  <Router key={index} {...value} />
                ))
              }
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

