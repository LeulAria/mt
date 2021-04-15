import React from 'react';
import { Grid, Box, Container, Paper } from '@material-ui/core'
import Robot from '../../../assets/icons/developers/Icon awesome-robot.svg'
import Feather from '../../../assets/icons/developers/Icon feather-alert-circle.svg'
import SmsMaterial from '../../../assets/icons/developers/Icon material-sms.svg'
import Auth from '../../../assets/icons/developers/Icon simple-auth0.svg'
import { makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(6),
        // width: '60%',
        height: '10rem',
        // textAlign: 'center',
        fontWeight: 1000,
        fontSize: '11px',
        background: '#A9DBF4',
        borderRadius: '10px',
        marginTop: '2rem'
        // color: theme.palette.text.secondary,
    },
    gridItems: {
        padding: '1% 10%',
        //   marginLeft: '3%'
    }
}));

export default function Sms() {
    const classes = useStyles()
    return (
        <div>

            <Container>
                <Grid container direction="row"
                    justify="space-around"
                    alignItems="center" className={classes.gridItems}>
                    <Grid xs={8} lg={2} md={2}>
                        <Box>
                            <Paper className={classes.paper} elevation={0} >
                                <Box my={1} display="flex" alignItems="center" justifyContent="center">
                                    <SmsMaterial />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid xs={8} lg={2} md={2}>
                        <Paper className={classes.paper} elevation={0}>
                            <Box my={1} display="flex" alignItems="center" justifyContent="center">
                                <Auth />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid xs={8} lg={2} md={2}>
                        <Paper className={classes.paper} elevation={0}>
                            <Box my={1} display="flex" alignItems="center" justifyContent="center">
                                <Robot />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid xs={8} lg={2} md={2}>
                        <Paper className={classes.paper} elevation={0} >
                            <Box my={1} display="flex" alignItems="center" justifyContent="center">
                                <Feather />
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}
