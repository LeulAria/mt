import React, { useEffect, useState } from 'react'
import moment from 'moment';
// import { v4 as uuid } from 'uuid';
import { v4 as uuid } from 'uuid'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, sendNotification } from '../../../features/auth/actions';
import { RootState } from '../../../app/store';
import Dialogue from "../../../components/dialogBox";
import { useForm } from "react-hook-form";

const orders = [
    {
        id: uuid(),
        ref: 'CDD1049',
        amount: 30.5,
        customer: {
            name: 'Ekaterina Tankova'
        },
        createdAt: 1555016400000,
        status: 'pending'
    },
    {
        id: uuid(),
        ref: 'CDD1048',
        amount: 25.1,
        customer: {
            name: 'Cao Yu'
        },
        createdAt: 1555016400000,
        status: 'delivered'
    },
    {
        id: uuid(),
        ref: 'CDD1047',
        amount: 10.99,
        customer: {
            name: 'Alexa Richardson'
        },
        createdAt: 1554930000000,
        status: 'refunded'
    },
    {
        id: uuid(),
        ref: 'CDD1046',
        amount: 96.43,
        customer: {
            name: 'Anje Keizer'
        },
        createdAt: 1554757200000,
        status: 'pending'
    },
    {
        id: uuid(),
        ref: 'CDD1045',
        amount: 32.54,
        customer: {
            name: 'Clarke Gillebert'
        },
        createdAt: 1554670800000,
        status: 'delivered'
    },
    {
        id: uuid(),
        ref: 'CDD1044',
        amount: 16.76,
        customer: {
            name: 'Adam Denisov'
        },
        createdAt: 1554670800000,
        status: 'delivered'
    }
];

const LatestOrders = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const dispatch = useDispatch();
    const clients = useSelector((state: RootState) => state.auth.clients)
    const { control, formState: { errors }, handleSubmit } = useForm();
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const sendNotifications = (data: any) => {
        const message = {
            ...data,
            ...currentUser
        }
        dispatch(sendNotification(message))
        handleClose()
    }

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <div>

        <Card {...props}
        style={{
            margin: "2rem",
          }}
        >
            <CardHeader title="Employee List" />
            <Divider />
            <PerfectScrollbar>
                <Box style={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Company Name
                    </TableCell>
                                <TableCell>
                                    Company Url
                    </TableCell>
                                <TableCell sortDirection="desc">
                                    <Tooltip
                                        enterDelay={300}
                                        title="Sort"
                                    >
                                        <TableSortLabel
                                            active
                                            direction="desc"
                                        >
                                            Email
                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    Phone Number
                    </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow
                                    onClick={()=>{setCurrentUser({...client}); handleClickOpen()}}
                                    hover
                                    key={client.id}
                                >
                                    <TableCell>
                                        {client.companyName}
                                    </TableCell>
                                    <TableCell>
                                        {client.companyUrl}
                                    </TableCell>
                                    <TableCell>
                                        {/* {moment(client.last_send).format('DD/MM/YYYY')} */}
                                        {client.email}
                                    </TableCell>
                                    <TableCell>
                                        {client.phoneNumber}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                >
                    View all
            </Button>
            </Box>
            <Dialogue 
                handleClose={handleClose} 
                handleClickOpen={handleClickOpen} 
                open={open}
                handleSubmit={handleSubmit}
                sendNotifications={sendNotifications}
                control={control}
                errors={errors}
                />
        </Card>
        </div>
    );
}

export default LatestOrders;
