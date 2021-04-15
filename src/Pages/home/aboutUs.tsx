import React from 'react'
import { Typography, Grid, Box, Container } from '@material-ui/core'
import handImg from '../../assets/images/AboutusHand.png'
import backgroundImg from '../../assets/images/AboutusBackground.png'
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root:{
      backgroundImage: `url(${backgroundImg})`,
      backgroundRepeat: "no-repeat",
    //   background: rgba(0, 0, 0, 0.7),
    //   width: '190%',
    //   marginLeft: '30%',
      marginTop: '2%',
      height: "33vh",

    },
    title: {
        color: '#2BAF9C',
        fontWeight: 1000
    },
    contain: {
        marginTop: '3%'
    },
    container: {
        paddingTop: '2%'
    }
  

  }));
export default function AboutUs() {
    const classes = useStyles()
    return (
        <div >
            <Grid item xs={12} sm={12}>
                <Box textAlign="center" mt={3}>
                <Typography variant={"h4"} className={classes.title} >Do you want speed</Typography>
                </Box>
            </Grid>
            {/* <Container className={classes.contain} > */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Box>
                     <img src={handImg} width={'100%'}  />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box className={classes.root} paddingTop={'1%'}>
                        {/* <Container className={classes.container}> */}
                        <Typography align={'center'} color='primary'  display='inline'  >
                                    Teklogix is one of the leading technology consulting and systems
                        integration firms headquartered in Dubai, U.A.E. specializing in next-
                        generation technology and digital transformation engagements with
                        operations throughout the Middle East and Africa. Teklogix helps
                        clients plan their investment in technology, design and implement
                        technology projects, and offer various managed services that can drive
                        our clients' competitive advantage.
                        </Typography>
                        {/* </Container> */}
                    </Box>
                </Grid>
            </Grid>
            {/* </Container> */}
        </div>
    )
}
