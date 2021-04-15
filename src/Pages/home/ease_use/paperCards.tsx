import React from 'react'
import { Typography, Box, Paper } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    title2: {
        color: 'white',
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '10px'
    },
    subTitle: {
        fontSize: '18px',
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    card: {
        borderRadius: '0.5rem',
        marginBottom: '3rem',
        backgroundColor: '#0093F7'
    },
    cardContainer: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    cardContainerIcon: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            justifyContent: 'center'
        }
    },
    cardContainerTitle: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '1rem'
        }
    },
}));

// C4EBFF

export default function Api({ Svgs, title, hasDescription=false }: any) {
    const classes = useStyles()
    return (
        <Paper className={classes.card} elevation={0} style={{minHeight: "10rem", padding: !hasDescription ?  '1.5rem' : ''}}>
            <Box display="flex" flexDirection="row" py={3} className={classes.cardContainer} height="100%">
                <Box px={2} width="40%" display="flex" flexDirection="row" alignItems="center" className={classes.cardContainerIcon}>
                    <Svgs />
                </Box>
                <Box width="60%" className={classes.cardContainerTitle} style={{ display: !hasDescription ? 'flex' : '', justifyContent: !hasDescription ? 'flex-start': 'center', alignItems: 'center' }}>
                    <Typography variant="h5" align="center" className={classes.title2}>{title}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}
