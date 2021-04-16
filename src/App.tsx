import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles, Theme, createStyles, ThemeProvider } from '@material-ui/core/styles';
import { routes } from "./configRoute/configs";
import Router from "./configRoute/routeSubRoute";
import { theme } from "./app/theme"

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
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <BrowserRouter>
        {
          routes[2].bars
        }
          <Switch>
            {
              routes.map((v, i) => (
                <Route
                  key={i}
                  path={v.path}
                  // children=
                >  
                {
                   v.bars
                }
                </Route>
              ))
            }
          </Switch>
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

