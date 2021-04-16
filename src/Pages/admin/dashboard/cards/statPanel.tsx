import { Box, Paper, Typography } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People';
import LanguageIcon from '@material-ui/icons/Language';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import React from 'react'

export default function StatPanel({title, value, icons}: any) {
    return (
        <div>
            <Paper style={{borderRadius: '0.5rem', margin: '1rem', marginTop: '0rem'}}>
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
            </Paper>
        </div>
    )
}
