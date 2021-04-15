import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: "#00CDB8",
            light: "#C5B235",
            dark: "#008DD4",
        },
        secondary: {
            main: "#2F3A45",
        }
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },

})

theme.props = {
    MuiButton: {
        disableElevation: true,
        variant: 'contained'
    }
}

theme.overrides = {
    MuiSelect:{
        
    },
    MuiInputLabel:{
        root:{
            fontSize: '12.5px',
            letterSpacing: '1px',
            fontWeight: 'bold',
            color: 'black',
            margin: '0px',
            marginLeft: '10px',
            '&$focused':{
                marginLeft: '10px',
            }
        },
        // marginDense:{
        //     // margin: '1px',
        //     marginBottom: '10px',
        //     padding: '10rem'
        // }
    },
    MuiInput:{
        root:{
            padding: '2px 4px',
        },
        underline:{
            '&:before': {
                borderBottom: `2px solid ${theme.palette.primary.main}`
            },
            '&:after': {
                borderBottom: `3px solid ${theme.palette.primary.dark}`
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: `2px solid ${theme.palette.secondary.main}`
            }
        }
    },

    MuiButton: {
        root: {
            borderRadius: '0',
            // color: 'white',
        },
        label: {
            // color: 'white',
            marginLeft: '0.6rem',
            marginRight: '0.6rem',
            marginTop: '0.3rem',
            marginBottom: '0.3rem',
        },
        containedPrimary: {
            '&:hover': {
                backgroundColor: '#BFA66D'
            }
        },
        endIcon: {
            marginLeft: '2rem'
        },
        startIcon: {
            marginRight: '0.5rem'
        }
    }
}