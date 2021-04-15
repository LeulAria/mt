import { Typography, Box, Divider } from '@material-ui/core'
import Logo2 from '../../assets/logos/LOGO2svg.svg'
import EtLogo2 from '../../assets/icons/footer/Ethiotelecom22.svg'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({

    footer: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        background: "#DBDBDB",
        paddingTop: '3rem',
        minHeight: '19rem'
    },
    footerTitle: {
        fontWeight: 700,
        color: '#1C4E74',
        fontSize: '26px'
    },
    footerText: {
        fontWeight: 700,
        // color: '#1C4E74',
        fontSize: '17px',
        lineHeight: '2rem'
    },
    lists: {
        paddingLeft: '7%',
        fontSize: '14px',
        fontWeight: 900
    },
    mainBox:{
        [theme.breakpoints.down('md')]:{
            flexDirection: 'column',
            height: 'auto'
        }
    },
    subBox1:{
        [theme.breakpoints.down('md')]:{
            // flexDirection: 'column',
            width: '100%',
            justifyConten: 'center',
            padding: '1rem 1rem'
        }
    },
    subBox2:{
        [theme.breakpoints.down('md')]:{
            // flexDirection: 'column',
            width: '100%',
            padding: '1rem 1rem'
        }
    }
}))


export default function Footer() {
    const classes = useStyles()
    return (
        <div className={classes.footer}>
                <Box display="flex" flexDirection="row" height="13rem" className={classes.mainBox}>
                    <Box width="70%" height="100%"  className={classes.subBox1}>
                        <Box display="flex" flexDirection="row" px={14} alignItems="center" justifyContent="space-around" width="100%" height="100%">
                            <Box ><img src={EtLogo2} /></Box>
                            <Box ml={4}><img src={Logo2}/></Box>
                            <Box mx={10}>
                                <Box fontSize="18px" color="#0A3BA8">teklogix.et</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box  width="30%" height="100%" className={classes.subBox2}>
                        <Box>
                            <Typography variant={'h5'} align='center' className={classes.footerTitle}>
                                Africa Regional Office
                                    </Typography>
                            <Typography align='center' className={classes.footerText}>
                                Meskel flower, <br />
                                
                                        Central Bldg, 5th floor <br />
                                        Addis Ababa, Ethiopia <br />
                                <span style={{ color: '#0A3BA8' }}>email : a2p@teklogix.et</span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            <Divider
                variant="fullWidth"
                style={{
                    width: '100%',
                    border: '0px solid black',
                    backgroundColor: 'black'
                }}
            />
            <Box display="flex" width="100%" px={6} my={1} pt={2}>
                <Box display="flex" width="55%" justifyContent="flex-end" color="black" fontWeight={600}>
                    {"© "}
                A2p@teklogix 2021
                </Box>
                <Box display="flex" width="45%" justifyContent="flex-end" color="black" fontWeight={500}>
                    <Box>Terms of use</Box>
                    <Box width={20} />
                    <Box>Privacy Policy</Box>
                    <Box width={70}/>
                </Box>
            </Box>
        </div>
    )
}
