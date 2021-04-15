import React from 'react'
import { Typography, Grid, Box, Container } from '@material-ui/core'
import InfoCard from './informationCards';
import {ReactComponent as Transportandlogistics} from "../../../assets/icons/research/Transport.svg";
import {ReactComponent as MarketingAgency} from "../../../assets/icons/research/Marketing.svg";
import {ReactComponent as factorAuthentication} from "../../../assets/icons/research/factor.svg";
import {ReactComponent as FinancialServices_} from "../../../assets/icons/research/Financial.svg";
import {ReactComponent as TravelAgency} from "../../../assets/icons/research/Travel.svg";
import {ReactComponent as Ecomerce} from "../../../assets/icons/research/Ecomerce.svg";
import Header from "../../../assets/backgrounds/Background.png";
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: `url(${Header}) no-repeat center center`,
        backgroundSize: 'cover',
        marginBottom: '10rem'
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
            <Box bgcolor="#C4EBFF" pt={11} mb={10}  className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container justify="center" alignContent="center" spacing={10} style={{padding: '0'}}>
                        <Grid item md={6} xs={10}>
                            <Box width="100%" pr={5} className={classes.cardHolder}>
                                <InfoCard
                                    Svgs={Ecomerce}
                                    title="Ecommerce"
                                    hasDescription={true}
                                    description="Customer engagement, SMS Campaign"
                                />
                                <InfoCard
                                    Svgs={Transportandlogistics}
                                    title="Transport and logistics"
                                    hasDescription={true}
                                    description="OTP, Customer Engagement"
                                />
                                <InfoCard
                                    Svgs={MarketingAgency}
                                    title="Marketing agency"
                                    hasDescription={true}
                                    description="Help your clients grow with mobile
                                    marketing platform"
                                />
                            </Box>
                        </Grid>
                        {/* ---------------------- */}
                        <Grid item md={6} xs={10}>
                            <Box width="100%" pl={5} className={classes.cardHolder}>
                                <InfoCard
                                    Svgs={TravelAgency}
                                    title="Travel agency"
                                    hasDescription={true}
                                    description="Customer Engagement, SMS
                                    Campaign"
                                />
                                <InfoCard
                                    Svgs={FinancialServices_}
                                    title="Financial Services and Retail"
                                    hasDescription={true}
                                    description="OTP, Customer Engagement,
                                    SMS Campaign"
                                />
                                <InfoCard
                                    Svgs={factorAuthentication}
                                    title="2 factor authentication"
                                    hasDescription={true}
                                    description="Verifying with A one-time passcode
                                    [OTP] for Reliable Security"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}
