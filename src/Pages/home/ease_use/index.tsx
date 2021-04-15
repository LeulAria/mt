import React from 'react'
import { Typography, Box, Container, Grid } from '@material-ui/core'
import ImageContainer from './imageHolder';
import A2PAPII from '../../../assets/images/ApplicationToPeermessaging.png'
import CODE from '../../../assets/images/CODE2.PNG'
import {ReactComponent as NoComplexity} from '../../../assets/icons/ease_use/NoComplexity.svg'
import {ReactComponent as NoDelay} from '../../../assets/icons/ease_use/NoDelay.svg'
import {ReactComponent as NoCable} from '../../../assets/icons/ease_use/NoCable.svg'
import PaperCards from './paperCards'
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: '10rem',
        marginBottom: '10rem',
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
        height: '30rem',
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
        color: '#364F91',
        fontWeight: 700,
        fontSize: '34px',
        marginBottom: '3rem'
    },
}));

const items = [
    {
        title: 'No Cable',
        icon: NoCable
    },
    {
        title: 'No Delay',
        icon: NoDelay
    },
    {
        title: 'No Complexity',
        icon: NoComplexity
    },

]

export default function Sms() {
    const classes = useStyles()
    return (
        <div className={classes.root} id="to-a2papi">
            <Container maxWidth="lg">
                <Typography className={classes.cardTitle}>Application-to-Peer messaging (A2P)</Typography>
            </Container>
            <Container>
                <Grid container spacing={10} justify="center">
                    {
                        items.map((content, index) => {
                            return <Grid item lg={4} xs={10} key={index}>
                                <Box width="100%" px={2}>
                                    <PaperCards title={content.title} Svgs={content.icon} />
                                </Box>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
            <Container className={classes.contain} >
                <Box display="flex" flexDirection="row" className={classes.container} mt={5}>
                    <Box width="50%" className={classes.child}>
                        <ImageContainer Image={A2PAPII} />
                    </Box>
                    <Box width="50%" className={classes.child}>
                        <Box my={1} fontWeight={1000} textAlign="center" color="#364F91" fontSize="24px">Just A Few Lines of Code</Box>
                        <ImageContainer Image={CODE} />
                    </Box>
                </Box>
            </Container>
        </div>
    )
}
