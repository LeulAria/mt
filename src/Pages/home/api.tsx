import React from 'react'
import { Typography, Grid, Box, Container, Paper } from '@material-ui/core'
import A2PAPI from '../../assets/images/A2PAPI.svg'
import DashboardImg from '../../assets/images/dashboard.png'
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    root:{
    //   backgroundImage: `url(${backgroundImg})`,
      backgroundRepeat: "no-repeat",
    //   background: rgba(0, 0, 0, 0.7),
      width: '150%',
      marginLeft: '70%',
      marginTop: '2%',
      height: "33vh",

    },
    title: {
        color: '#2BAF9C',
        fontWeight: 1000
    },
    contain: {
        marginTop: '2%'
    },
    
    container: {
        paddingTop: '2%'
    },
    topography: {
        color: '#072E5C'
    },
    paper: {
        padding: theme.spacing(6),
        // width: '60%',
        height: '85%',
        // textAlign: 'center',
        fontWeight: 1000,
        fontSize: '11px',
        background:'#A9DBF4',
        // color: theme.palette.text.secondary,
      },
      gridItems: {
          padding: '1% 10%',
        //   marginLeft: '3%'
      }
  }));

export default function Api() {
    const classes = useStyles()
    return (
        <div>
             <Grid item xs={12} sm={12}>
                <Box textAlign="center" mt={3}>
                <Typography variant={"h4"} className={classes.title}>Solutions</Typography>
                </Box>
            </Grid>
              
            <Container className={classes.contain} >
            <Grid 
                container 
                spacing={10} 
                direction="row"
                justify="center"
                alignItems="center"
                >
               
                <Grid item xs={12} md={6}>
                        <Container className={classes.container}>
                            <Typography variant={'h5'} className={classes.topography} >A2P API</Typography>
                            <br />
                        <Typography align={'center'} display='inline'  >
                            Person to Person messaging (P2P) is defined as two-way
                            SMS or MMS messaging. For example, anonymous
                            conversations between two users, surveys and group
                            messaging are considered to be P2P messaging.
                            <br />
                            <br />
                            Message manager has brought about the easiest and
                            fastest application to manage your SMS as well as the MMS
                            campaigns through different types of clients.
                        </Typography>
                        </Container>
                </Grid>
                <Grid item xs={12} md={6}  >
                    <A2PAPI />
                </Grid>
            </Grid> 
                
                <Grid container direction="row"
                justify="space-around"
                alignItems="center"  className={classes.gridItems}>
                  <Grid xs={8} sm={2}>
                      <Box>
                     
                        <Paper className={classes.paper} elevation={6} >
                            <Box my={1}>
                                SMS API integration
                                </Box>
                                </Paper>
                      </Box>
                      </Grid>
                  <Grid xs={8} sm={2}>
                      <Box my={2}>
                      <Paper className={classes.paper} elevation={6}>
                          <Box my={1}>

                          2 factor authentication
                          </Box>
                          </Paper>
                  </Box>
                  </Grid>
                  <Grid xs={8} sm={2}>
                      <Box my={2}>

                      <Paper className={classes.paper} elevation={6}>Automatic booking confirmations</Paper>
                      </Box>
                  </Grid>
                  <Grid xs={8} sm={2}>
                      <Box>

                      <Paper className={classes.paper} elevation={6} >Deliver time sensitive alerts</Paper>
                      </Box>
                  </Grid>

                </Grid>
            </Container>
        </div>
    )
}
