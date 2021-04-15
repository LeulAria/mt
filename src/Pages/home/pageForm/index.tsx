import {  Box, Typography, Grid } from "@material-ui/core";
import './style.css'
import UserForm from './user_form'
import Footer from '../footer';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    imageBox: {
        position: 'relative',
        height: '40rem',
        // backgroundColor: 'red'
    },
    imageHolder: {
        position: 'absolute',
        top: '200px',
        right: 0,
        width: '100%',
        height: '30rem',
        [theme.breakpoints.down("md")]: {
            display: 'none'
        }
    },
    comp: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10
    },
    a2pTitle: {
        fontWeight: 700,
        letterSpacing: '1px',
        color: "#09AE9C",
        fontSize: '40px'
    },
    text: {
        textAlign: 'start',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
        fontWeight: 700,
        fontSize: '20px'
    },
    a2pTitle2: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    text2: {
        color: 'white',
        textAlign: 'start',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        }
    },
    parentBox: {
        paddingTop: '8rem',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
            backgroundColor: 'white'
        }
    },
    parent: {
        width: '100%'
    },
    regBtn: {
        [theme.breakpoints.up('md')]: {
            width: '70%'
        },
        background: `linear-gradient(45deg, #0088D6 30%, #00CDB8 90%)`
    },
    checkBoxContainer: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '7rem'
        },
    },
    contactText:{
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    }
}))


export default function PageForm() {
    const classes = useStyles();
    return (
        <div id="back-to-top-anchor">
                <Box className={classes.imageBox}>
                    <svg viewBox="0 0 600 360"><path fill="#007CD9" fill-opacity="1" d="M0,240L1100,32L1440,9920L-10,320Z" className={classes.imageHolder}></path></svg>
                    <Grid container className={classes.comp} justify="center">
                        <Grid item lg={5} xs={10}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                                width="100%"
                                height="100%"
                                className={classes.parentBox}>
                                <Box my={1}>
                                    <Typography className={classes.a2pTitle} variant="h4">Register Now</Typography>
                                </Box>
                                <Box my={1} width="70%">
                                    <Typography className={classes.text}>
                                    Register now and use our ready made SMS <br/>
                                    campaign platform or use our API to send SMS <br/>
                                    from your system.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item lg={4} xs={10}>
                            <UserForm />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="center"
                                width="100%"
                                height="10rem"
                                bgcolor="#007CD9"
                                px={13}
                                className={classes.parentBox}>
                            </Box>
                        </Grid>

                        <Grid xs={12}>
                            <Footer />
                        </Grid>
                    </Grid>
                </Box>
            {/* </ThemeProvider> */}
        </div>
    )
}