import { Box, Container, Grid, Paper, Theme } from '@material-ui/core'
import Chart from './chart'
import StatPanel from './statPanel'
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles((theme: Theme)=>({
    container:{
        marginTop: '3rem'
    }
}))

export default function Cards() {
    const classes = useStyles();
    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid container justify="center">
                <Grid item md={8} xs={10}>
                    <Box display="flex" flexDirection="row" width="90%">
                        <Box display="column" width="50%">
                        <StatPanel
                            title="Total Users"
                            value="30"
                            icons={1}
                        />
                        <StatPanel
                            title="Page Visits"
                            value="150"
                            icons={2}
                        />
                        </Box>
                        <Box display="column" width="50%">
                        <StatPanel
                            title="Subscribed Users"
                            value="5"
                            icons={3}
                        />
                        <StatPanel
                            title="API Usage Per Day"
                            value="130"
                            icons={4}
                        />
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={3} xs={10}>
                    <Paper style={{width: '100%', height: '25rem'}}>
                        <Chart/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
