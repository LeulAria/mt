import { Typography, Box, Paper } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    title2: {
        color: '#040734',
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '10px'
    },
    subTitle: {
        fontSize: '16px',
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    card: {
        borderRadius: '0.5rem',
        marginBottom: '3rem'
    },
    cardContainer: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
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

export default function Api({ Svgs, title, description, hasDescription=false }: any) {
    const classes = useStyles()
    return (
        <Paper className={classes.card} elevation={5} style={{minHeight: hasDescription ? "9rem": "10rem", padding: !hasDescription ?  '1.5rem' : ''}}>
            <Box display="flex" flexDirection="row" px={2} py={3} className={classes.cardContainer} height="100%"
                 alignItems="center"
            >
                <Box width="20%" height="100%" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="center" className={classes.cardContainerIcon}
                >
                    <Svgs />
                </Box>
                <Box width="70%" className={classes.cardContainerTitle} style={{ display: !hasDescription ? 'flex' : '', justifyContent: !hasDescription ? 'flex-start': 'center', alignItems: 'center' }}>
                    <Typography variant="h5" className={classes.title2}
                    style={{fontSize: hasDescription ? "20px": "17px"}}
                    >{title}</Typography>
                    {
                        hasDescription &&
                        <Typography className={classes.subTitle}>
                            {description}
                        </Typography>
                    }
                </Box>
            </Box>
        </Paper>
    )
}
