import React from 'react';
import {  Box, Typography, Button } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    a2pTitle: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: '1px',
        [theme.breakpoints.down('md')]:{
            align: 'center'
        }
    },
    text: {
        color: 'white',
        textAlign: 'start',
        fontWeight: 500,
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        }
    },
    btn: {
        background: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        color: '#355074',
        borderRadius: '0.4rem'
    },
    parentBox: {
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
}))

export const SecondItem = () => {
    const classes = useStyles();
    const handleClick = (event: any) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#to-smsCamp',
        );
      
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      };
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            width="100%"
            height="100%"
            className={classes.parentBox}>
            <Box my={1}>
                <Typography className={classes.a2pTitle} align="left" variant="h3">Easy to Use <br/> SMS Marketing Platform</Typography>
            </Box>
            <Box my={2}>
                <Typography className={classes.text}>
                    Empower your business with easy to use <br/> SMS customer engagement platform.
                </Typography>
            </Box>
            <Box my={1}>
                <Button className={classes.btn} variant="contained"
                    onClick={(e: any)=>{handleClick(e)}}
                >
                    Find out more
                </Button>
            </Box>
        </Box>

    )
}