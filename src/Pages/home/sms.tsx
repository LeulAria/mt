import React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import {ReactComponent as SMSManager} from '../../assets/images/SMSMarketing.svg'
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        //   backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        //   background: rgba(0, 0, 0, 0.7),
        width: '150%',
        marginLeft: '70%',
        marginTop: '2%',
        height: "33vh",

    },
    contain: {
        marginTop: '4rem',
        marginBottom: '4rem'
    },
    container: {
        paddingTop: '2%'
    },
    topography: {
        color: '#28287D',
        fontWeight: 800,
    },
    topography2: {
        // color: '#28287D',
        fontWeight: 700
    },
    listItem: {
        // display: 'inline'
    },
    cardTitle: {
        color: '#364F91',
        fontWeight: 800,
        fontSize: '32px',
        marginBottom: '1rem'
    },

}));

export default function Sms() {
    const classes = useStyles()
    return (
        <div id="to-smsCamp">
            <Container className={classes.contain} >
                <Grid
                    container
                    spacing={3}
                    direction="row-reverse"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} md={6}>
                        <SMSManager />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Container className={classes.container}>
                            <Typography variant={'h5'} className={classes.cardTitle} >
                                Easy to Use <br />
                                SMS Marketing Platform
                            </Typography>
                            <br />
                            <Typography align={'center'} variant='h6' display='inline' className={classes.topography2} >
                                Empower your business with easy to use  <br />  
                                SMS customer engagement platform
                            </Typography>
                        </Container>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Box my={7}>
                            <img src={DashboardImg} width={'100%'} />
                        </Box>
                    </Grid> */}
                </Grid>
            </Container>
        </div>
    )
}
