import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SMSManager from '../../../assets/images/maskgroup.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      height: '100%',
      [theme.breakpoints.down('sm')]:{
          marginTop: '20px'
      }
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
  }),
);

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList} cols={1}>
          <GridListTile cols={1}>
            <img src={SMSManager} alt="title" width="100%" height="100%" />
          </GridListTile>
      </GridList>
    </div>
  );
}
