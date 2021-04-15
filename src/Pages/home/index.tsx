import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import Logo from '../../assets/logos/LOGOMAIN.svg'
import EthLogo from '../../assets/logos/Ethiotelecom.svg'
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { Button} from '@material-ui/core';
import Sms from './sms';
import Res from './resource_section';
import Form from './pageForm';
import { Gallery } from './headerSlider/index'
import SMSMADE from './sms_made_simple/index'
import Ease from './ease_use/index'
import { theme } from '../../app/theme/landingForm';


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        topBox: {
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            }
        },
        innerBox: {
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '0'
            }
        },
        toolbar: {
            minHeight: '6rem',
            backgroundColor: 'white'
        },
        regBtn: {
            backgroundColor: '#1C4E74',
            color: 'white',
            borderRadius: '2rem',
            fontSize: '12px',
            padding: '0.4rem 2rem'
        }
    }),
);

export default function HideAppBar(props: Props) {
    const classes = useStyles();
    const { children, window } = props;

    const handleClick = (event: any) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HideOnScroll {...props}>
                    <AppBar elevation={0}>
                        <Toolbar className={classes.toolbar}>
                            <Box width="100%" display="flex" flexDirection="row" alignItems="center" className={classes.topBox}>
                                <Box flexGrow={1} pl={15} display="flex" flexDirection="row" alignItems="center" className={classes.innerBox} >
                                    <img src={EthLogo} />
                                    <Box ml={4} ><img src={Logo} /></Box>
                                </Box>
                                <Box flexShrink={0} display="flex" justifyContent="space-between" color="black">
                                    <Button
                                        className={classes.regBtn}
                                        onClick={(e: any)=>{handleClick(e)}}>
                                        Register
                                    </Button>
                                </Box>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                {/* <Toolbar /> */}
                <div>
                    <Gallery />
                    <SMSMADE />
                    <Sms />
                    <Res />
                    <Ease />
                    <Form />
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}
