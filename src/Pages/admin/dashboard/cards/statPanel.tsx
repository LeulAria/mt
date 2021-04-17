import { Box, Paper, Typography, Card, CardActionArea, CardContent, Divider, CardActions } from '@material-ui/core'
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import AtmIcon from '@material-ui/icons/Atm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        parent: {
            position: 'relative'
        },
        hoverCard: {
            position: 'absolute',
            width: '45%',
            height: '70%',
            bottom: '60px',
            left: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 1px 7px rgba(0,0,0,0.3)',
            borderRadius: '1px',
            // backgroundColor: appTheme ? 'white' : 'white',
            cursor: 'pointer',
            transition: 'all 0.4s',
            '&:hover': {
                transform: 'translateY(-20%)',
                // backgroundColor: appTheme ? 'white' : 'white'
            },
            // boxShadow: '2px 2px 10px',
            border: 'none',
        }
    }),
);


export default function StatPanel({ title, value, icons, colors }: any) {
    const classes = useStyles();
    return (
        <div className={classes.parent}>
            <Card>
                <CardActionArea style={{ height: '7rem' }}>
                    <CardContent>
                        <Box width="100%" display="flex" flexDirection="column" alignItems="flex-end">
                            <Typography>{title}</Typography>
                            <Typography variant="h5">{value}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions style={{ padding: '0' }}>
                    <p>Get More spacce</p>
                </CardActions>
            </Card>
            <Card className={classes.hoverCard} style={{ backgroundColor: `${colors}` }}>
                {
                    icons === 1 ?
                        <GroupIcon style={{ width: '60%', height: '50%', color: '#FFFFFF' }} /> :
                        icons === 2 ?
                            <SubscriptionsIcon style={{ width: '60%', height: '50%', color: '#FFFFFF' }} /> :
                            <AtmIcon style={{ width: '60%', height: '50%', color: '#FFFFFF' }} />
                }
            </Card>
            {/* <Paper style={{borderRadius: '0.5rem', margin: '1rem', marginTop: '0rem'}}>
                <Box display="flex" flexDirection="row" width="100%" height="8rem">
                    <Box width="80%" height="100%" px={2} display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                            <Box fontWeight={600} fontSize="20px" color="#7367EF">{title}</Box>
                            <Typography variant="h3">{value}</Typography>
                    </Box>
                    <Box width="20%" height="100%" display="flex" alignItems="center" justifyContent="center">
                        {
                            icons === 1?
                            <PeopleIcon style={{width: '60%', height: '50%', color: '#83A6ED'}}/> :
                            icons === 2?
                            <LanguageIcon style={{width: '60%', height: '50%', color: '#82CA9D'}}/> :
                            icons === 3?
                            <SubscriptionsIcon style={{width: '60%', height: '50%', color: '#A4DE6C'}}/> :
                            <SettingsInputHdmiIcon style={{width: '60%', height: '50%', color: '#7367EF'}}/> 

                        }
                    </Box>
                </Box>
            </Paper> */}
        </div>
    )
}
