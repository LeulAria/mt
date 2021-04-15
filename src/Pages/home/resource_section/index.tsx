import React from 'react'
import {  Grid, Box, Container } from '@material-ui/core'
import InfoCard from './informationCards';
import DashboardImg from '../../../assets/images/dashboard.png'
import {ReactComponent as Automatemarketing} from "../../../assets/icons/research/Automatemarketing.svg";
import {ReactComponent as ViewDeliveryReport} from "../../../assets/icons/research/ViewDeliveryReport.svg";
import {ReactComponent as Segment} from "../../../assets/icons/research/Segment.svg";
import {ReactComponent as SendSms} from "../../../assets/icons/research/SendSms.svg";
import Header from "../../../assets/backgrounds/Background.png";
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: `url(${Header}) no-repeat center center`,
        backgroundSize: 'cover',
    },
    title: {
        color: '#2BAF9C',
        fontWeight: 900,
        fontSize: '28px',
        marginBottom: '1rem'
    },
    cardTitle: {
        color: '#1C4F7A',
        fontWeight: 900,
        fontSize: '24px',
        marginBottom: '3rem'
    },
    cardHolder: {
        [theme.breakpoints.down('md')]:{
            padding: '0'
        }
    },
}));

// C4EBFF

export default function Api() {
    const classes = useStyles()
    return (
        <div>
            <Box bgcolor="#C4EBFF" pt={11} className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container justify="center" alignContent="center" spacing={10} style={{padding: '0'}}>
                        <Grid item md={6} xs={10}>
                            <Box width="100%" pr={5} className={classes.cardHolder}>
                                <InfoCard
                                    Svgs={Automatemarketing}
                                    title="Automate Your Marketing Campaign"
                                    hasDescription={false}
                                    description=""
                                />
                                <InfoCard
                                    Svgs={SendSms}
                                    title="Send Bulk SMS"
                                    hasDescription={false}
                                    description=""
                                />
                            </Box>
                        </Grid>
                        {/* ---------------------- */}
                        <Grid item md={6} xs={10}>
                            <Box width="100%" pl={5} className={classes.cardHolder}>
                                <InfoCard
                                    Svgs={ViewDeliveryReport}
                                    title="View your Delivery Report"
                                    hasDescription={false}
                                    description=""
                                />
                                <InfoCard
                                    Svgs={Segment}
                                    title="Send Targeted Message"
                                    hasDescription={false}
                                    description=""
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container>
                <Grid item xs={12}>
                    <Box my={10}>
                        <img src={DashboardImg} width={'100%'} />
                    </Box>
                </Grid>
            </Container>
        </div>
    )
}
