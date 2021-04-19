import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton } from '@material-ui/core'

export default function Notification({from, time, message}: any) {
    return (
        <div>
            <Card>
                <CardHeader
                    title={from}
                    subheader={time}
                />
                <CardActionArea disabled>
                    <CardContent>
                        {message}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <IconButton>
                            <DeleteIcon style={{color: 'red'}}/>
                        </IconButton>
                    </Box>
                </CardActions>
            </Card>
        </div>
    )
}
