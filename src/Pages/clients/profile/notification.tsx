import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';
import { collection } from 'rxfire/firestore';
import firebase from '../../../firebase/firebase'
import { map } from 'rxjs/operators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { setNotifications } from "../../../features/auth";
import moment from 'moment';
import { convertTimestamp } from "convert-firebase-timestamp";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);


export default function Notification() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const uid = useSelector((state: RootState) => state.auth.currentUser.uid)
    const [userNotification, setuserNotification] = useState<any>([]);
    useEffect(() => {
        const db = firebase.firestore();
        const collectionRef = db.collection('notifications');
        const coll = collection(collectionRef)
            .pipe(
                map(docs => {
                    const current: any = [];
                    docs.map(d => {
                        if (d.id === uid) {
                            current.push(...d.data().notification)
                        }
                    })
                    return current;
                })
            )
            .subscribe(users => {
                dispatch(setNotifications(users.reverse()))
                setuserNotification([...users])
            });

        return () => {
            coll.unsubscribe()
        }
    }, [])

    return (
        <div>
            {
                userNotification && userNotification.map((value, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Alert severity={
                                value.messageType === 'warning' ? 'warning' :
                                    value.messageType === 'info' ? 'info' :
                                        value.messageType === 'error' ? 'error' :
                                            'success'
                            }
                                style={{ width: '100%' }}
                            >
                                {/* <List> */}
                                <ListItem style={{ padding: 0 }}>
                                    <ListItemText 
                                        style={{ padding: 0, margin: 0 }}
                                        primary={`From ${value.from}`} 
                                        secondary={
                                            moment(`${convertTimestamp(value.createdAt)}`).fromNow()
                                        } />
                                </ListItem>
                                {/* </List> */}
                            </Alert>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {value.message}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    )
}
