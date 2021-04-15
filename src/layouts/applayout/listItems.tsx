import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/EmailOutlined';
import Notification from '@material-ui/icons/Notifications';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import InboxIcon from '@material-ui/icons/MoveToInbox';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Notification />
      </ListItemIcon>
      <ListItemText primary="Notification" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);

export const drawerADMIN = (
  <div>
    <Divider />
      <ListItem button
            component={Link}
            to="/home/page1"
      >
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText primary={"Page 1"} />
      </ListItem>
    <Divider />
      <ListItem
        button
        component={Link}
        to="/home/page2"
      >
        <ListItemIcon><InboxIcon /> </ListItemIcon>
        <ListItemText primary="Page 2" />
      </ListItem>
  </div>
);