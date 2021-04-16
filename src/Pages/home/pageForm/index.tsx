import React from 'react'
import { Box, Typography, Grid } from "@material-ui/core";
import './style.css'
import UserForm from './user_form'
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
        fontSize: '42px'
    },
    text: {
        textAlign: 'start',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
        fontWeight: 700,
        fontSize: '18px'
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
        // paddingTop: '8rem',
        width: "100%",
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
    contactText: {
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    subBox2:{
        [theme.breakpoints.down('md')]:{
            display: 'none'
        }
    },
    subBox1:{
        [theme.breakpoints.up('lg')]:{
            display: 'none'
        }
    },
    footerTitle: {
        fontWeight: 700,
        color: 'black',
        fontSize: '24px'
    },
    footerText: {
        fontWeight: 700,
        // color: '#1C4E74',
        fontSize: '16px',
        lineHeight: '2rem'
    },
}))


export default function PageForm() {
    const classes = useStyles();
    return (
        <div id="back-to-top-anchor">
            <Box className={classes.imageBox}>
                <svg viewBox="0 0 600 310"><path fill="#007CD9" d="M0,170L1450,-212L1440,9920L-10,320Z" className={classes.imageHolder}></path></svg>
                <Grid container className={classes.comp} justify="center" >
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
                                    Register now and use our ready made SMS <br />
                                    campaign platform or use our API to send SMS <br />
                                    from your system.
                                    </Typography>
                            </Box>
                            <Box width="100%" height="100%"
                            className={classes.subBox2}
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="flex-start"
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    style={{
                                        marginLeft: '6rem'
                                    }}
                                >
                                    <Typography variant={'h5'} align='center' className={classes.footerTitle}>
                                        Africa Regional Office
                                    </Typography>
                                    <Typography align='center' className={classes.footerText}>
                                        Meskel flower, <br />

                                        Central Bldg, 5th floor <br />
                                        Addis Ababa, Ethiopia <br />
                                        <span style={{ color: 'white', fontWeight: 500, fontSize: '16px' }}>email : a2p@teklogix.et</span> <br/>
                                        <a href="https://www.teklogixinc.com/"
                                        style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '16px' }} 
                                        >www.teklogix.et</a>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item lg={4} xs={10}>
                        <UserForm />
                    </Grid>
                    <Grid item xs={12}
                        style={{
                            backgroundColor: '#007CD9'
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                            width="100%"
                            bgcolor="#007CD9"
                            py={6}
                            className={classes.subBox1}>
                                <Box
                                    my={2}
                                >
                                    <Typography variant={'h5'} align='center' className={classes.footerTitle}>
                                        Africa Regional Office
                                    </Typography>
                                    <Typography align='center' className={classes.footerText}>
                                        Meskel flower, <br />

                                        Central Bldg, 5th floor <br />
                                        Addis Ababa, Ethiopia <br />
                                        <span style={{ color: 'white', fontWeight: 500 , fontSize: '16px' }}>email : a2p@teklogix.et</span> <br/>
                                        <a href="https://www.teklogixinc.com/"
                                        style={{ color: 'white', textDecoration: 'none', fontWeight: 500 , fontSize: '16px' }} 
                                        >www.teklogix.et</a>
                                    </Typography>
                                </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* </ThemeProvider> */}
        </div>
    )
}