import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import NotificationCard from "../../../components/notificationCard";
import ReactMaterialUiNotifications from "react-materialui-notifications";
import moment from 'moment'
import { Message } from '@material-ui/icons';
import firebase from '../../../firebase/firebase'
import DashBoard from '../../admin/users_list';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
// import {deepOrange500} from '@material-ui/styles/colors'

export default function Notification() {
    const [data, setData] = useState([]);
    const uid = useSelector((state: RootState) => state.auth.currentUser.uid)
    console.log(uid);
    useEffect(() => {
        const db = firebase.firestore();
        db.collection('notifications').doc(`${uid}`)
            .onSnapshot((docSnapshot: any) => {
                if (docSnapshot.exists) {
                    console.log(moment(docSnapshot.data().notification[0].createdAt.toDate()).fromNow());
                    setData(docSnapshot.data().notification)
                }
            })
    }, [])
    console.log(data);
    return (
        <div>
            <Container style={{padding: '1rem'}}>
                <Grid container spacing={5}>
                    {
                        data.map((value: any, index: number) => (
                            <Grid item md={4} xs={7} key={index}>
                                <NotificationCard from={value.from} message={value.message} time={moment(value.createdAt.toDate()).fromNow()} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    )
}
