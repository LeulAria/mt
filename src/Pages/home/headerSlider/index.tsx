import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Header from "../../../assets/backgrounds/Background.png";
import {  Box, Paper, Grid } from "@material-ui/core";
import { FirstItem } from './firstItem'
import { SecondItem } from './secondItem'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import A2PAPII from '../../../assets/images/A2PAPI.png'
import SMSMarketing from '../../../assets/images/SMSMarketing.png'
import ImageHolder from '../../../components/image_container/imageHolder';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // background: `url(${Header}) no-repeat center center`,
    // backgroundSize: 'cover',
  },
  a2pTitle: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  text: {
    color: 'white',
    textAlign: 'start',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    }
  },
  btn: {
    color: 'black',
    background: 'white'
  },
  parent: {
    width: '100%',
    background: `url(${Header}) no-repeat center center`,
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  carousel: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  parentBox: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center'
    }
  },
  imageBox: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  imageHolder: {
    position: 'absolute',
    top: '150px',
    left: '20px',
    width: '100%',
    height: '100%',
  },
}))

export const Gallery = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.parent}>
      <Carousel
        autoPlay={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        swipeable={true}
        // transitionTime={3}
        className={classes.carousel}
      >
        <Box width="100%" height="100vh"
          className={classes.root}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} md={5}>
              <FirstItem />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className={classes.imageBox}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={15}
              >
                <ImageHolder Image={A2PAPII}/>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box width="100%" height="100vh"
          className={classes.root}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} md={5}>
              <SecondItem />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className={classes.imageBox}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={15}
              >
                <ImageHolder Image={SMSMarketing}/>
                </Box>
            </Grid>
            </Grid>
        </Box>
      </Carousel>
    </Paper>
  )
}