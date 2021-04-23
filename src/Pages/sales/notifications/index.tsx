import React, { useEffect, useState } from "react";
import moment from "moment";
// import { v4 as uuid } from 'uuid';
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
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
  Tooltip,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { getUser, sendNotification } from "../../../features/auth/actions";
import { RootState } from "../../../app/store";
import Dialogue from "../../../components/dialogBox";
import { useForm } from "react-hook-form";
import { collection } from "rxfire/firestore";
import firebase from "../../../firebase/firebase";
import { map } from "rxjs/operators";
import { UserRole } from "../../../features/auth/types";

const LatestOrders = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [users, setUsers] = useState<any>([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendNotifications = (data: any) => {
    const message = {
      ...data,
      ...currentUser,
    };
    dispatch(sendNotification(message));
    handleClose();
    reset();
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const collectionRef = db.collection("clients");
    const coll = collection(collectionRef)
      .pipe(
        map((docs) => {
          const current: any = [];
          docs.map((d: any) => {
            if (d.data().role === "USER") {
              current.push(d.data());
            }
          });
          return current;
        })
      )
      .subscribe((users) => {
        setUsers([...users]);
      });

    return () => {
      coll.unsubscribe();
    };
  }, []);
  return (
    <div>
      <Card
        {...props}
        style={{
          margin: "2rem",
        }}
      >
        <CardHeader title="Notify Client" />
        <Divider />
        <PerfectScrollbar>
          <Box style={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Company Url</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Email
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((client) => (
                    <TableRow
                      onClick={() => {
                        setCurrentUser({ ...client });
                        handleClickOpen();
                      }}
                      hover
                      key={client.id}
                    >
                      <TableCell>{client.companyName}</TableCell>
                      <TableCell>{client.companyUrl}</TableCell>
                      <TableCell>
                        {/* {moment(client.last_send).format('DD/MM/YYYY')} */}
                        {client.email}
                      </TableCell>
                      <TableCell>{client.phoneNumber}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
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
};

export default LatestOrders;
