import React from 'react'
import { Typography, Box, Container } from '@material-ui/core'
import Benefits from "./benefits";
import ImageContainer from './imageHolder';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    root:{
        marginTop: '10rem',
        marginBottom: '3rem',
    },
    contain: {
        marginTop: '3%'
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse'
        }
    },
    child: {
        height: 'auto',
        margin: '1rem',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
            margin: '0',
            width: '100%',
        }
    },
    topography: {
        color: '#072E5C'
    },
    imageBox: {
        position: 'relative',
    },
    imageHolder: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(6),
        // width: '60%',
        height: '85%',
        // textAlign: 'center',
        fontWeight: 1000,
        fontSize: '11px',
        background: '#A9DBF4',
        // color: theme.palette.text.secondary,
    },
    gridItems: {
        padding: '1% 10%',
        //   marginLeft: '3%'
    },
    cardTitle: {
        color: '#1C4F7A',
        fontWeight: 900,
        fontSize: '24px',
        marginBottom: '3rem'
    },
}));

export default function Sms() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Typography variant={"h4"} className={classes.cardTitle}>Developers</Typography>
            </Container>
            <Container className={classes.contain} >
                <Box fontWeight="bold" color="#28287D" fontSize="20px" textAlign="center" my={1}>
                    Benefit with immersive types of uses from our Solutions
                </Box>
                <Benefits />
                <Box display="flex" flexDirection="row" className={classes.container} mt={5}>
                    <Box width="50%" className={classes.child}>
                        <ImageContainer/>
                    </Box>
                    <Box width="50%" className={classes.child}>
                        <Typography align={'center'} display='inline' variant="h6"  >
                            Businesses can use A2P messaging in several technical modes in order
                            to communicate with consumers, authenticate users of online services,
                            or deliver time-sensitive alerts. In all cases, A2P SMS communication is
                            initiated from a business application, and not the individual’s mobile
                            phone. Different corporations have already deployed A2P messaging to
                            increase the efficiency of their messages and to improve
                            communication without any additional hustle.

                            <br />
                            <br />
                                In fact, many financial institutions have been using A2P SMS for over 15
                                years now, by delivering automated, event-based SMS notifications to
                                their clients’ mobile phones. Some examples are anti-fraud alerts,
                                payment reminders, balance statements, and withdrawal notifications.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}
