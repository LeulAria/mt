import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { items } from "../../constants/drawerListItems";
import List from '@material-ui/core/List';

export const DrawerADMIN = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth)
  console.log(auth.currentUser.role);
  return (
    <div>
      <List style={{ height: '100vh' }}>
        {
          auth.currentUser.role &&
          items[auth.currentUser.role].map((v: any, i: number) => (
            <div
              key={i}
            >
              <ListItem button
                component={Link}
                to={v.path}
              >
                <ListItemIcon><v.icon /></ListItemIcon>
                <ListItemText primary={v.title} />
              </ListItem>
              <Divider />
            </div>
          ))
        }
      </List>
    </div>
  )
}