import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Alert from "@material-ui/lab/Alert";
import { collection } from "rxfire/firestore";
import firebase from "../../../firebase/firebase";
import { map } from "rxjs/operators";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setNotifications } from "../../../features/auth";
import moment from "moment";
import Dialogue from "./dialogBox";
import { convertTimestamp } from "convert-firebase-timestamp";
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  CardHeader,
  ListItemText,
  Grid,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import MUIDataTable from "mui-datatables";
import { useForm } from "react-hook-form";
import { sendNotification } from "../../../features/auth/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    roots: {
      minWidth: "40vw",
      minHeight: "75vh",
    },
    card: {
      // marginTop: "1%",
      padding: "3%",
    },
  })
);

export default function Notification() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const uid = useSelector((state: RootState) => state.auth.currentUser.uid);
  const [userNotification, setuserNotification] = useState<any>([]);
  const columns = [
    {
      label: "User email",
      name: "email",
      options: {
        filter: true,
      },
    },
    {
      label: "UID",
      name: "uid",
      options: {
        filter: true,
        display: false,
      },
    },
  ];

  const options = {
    filter: false,
    print: false,
    download: false,

    selectableRowsHideCheckboxes: true,
    onRowClick: (event: any, rowData: any) => {
      //  getIndex(event);
      console.log(rowData, event, "data");

      setCurrentUser(event);
      handleClickOpen();
    },
  };
  const stateClient = useSelector((state: RootState) => state.auth);

  const data = stateClient.clients.filter((user) => {
    return (
      user.role == "USER" &&
      user.suspended != true &&
      user.verification_status == "VERIFIED"
    );
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleClose = () => {
    setOpen(false);
  };
  const sendNotifications = (data: any) => {
    console.log(data, currentUser[1], "pppp");

    const message = {
      ...data,
      uid: currentUser[1],
    };
    dispatch(sendNotification(message));
    handleClose();
    reset();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    const db = firebase.firestore();
    const collectionRef = db.collection("notifications");
    const coll = collection(collectionRef)
      .pipe(
        map((docs) => {
          const current: any = [];
          docs.map((d) => {
            if (d.id === uid) {
              current.push(...d.data().notification);
            }
          });
          return current;
        })
      )
      .subscribe((users) => {
        dispatch(setNotifications(users.reverse()));
        setuserNotification([...users]);
      });

    return () => {
      coll.unsubscribe();
    };
  }, []);
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="row"
        // alignItems="flex-end"
        justify="space-between"
        className={classes.card}
      >
        <Grid item xs={12} sm={5} alignItems="flex-start">
          <MUIDataTable
            title={"Client List"}
            data={data}
            columns={columns}
            options={options}
          />
        </Grid>
        <Grid item xs={12} sm={6} alignItems="flex-end">
          <Card className={classes.roots} variant="outlined">
            <CardHeader
              title={<Typography variant={"h6"}>Notification List</Typography>}
            ></CardHeader>
            <CardContent>
              {userNotification &&
                userNotification.map((value, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Alert
                        severity={
                          value.messageType === "warning"
                            ? "warning"
                            : value.messageType === "info"
                            ? "info"
                            : value.messageType === "error"
                            ? "error"
                            : "success"
                        }
                        style={{ width: "100%" }}
                      >
                        {/* <List> */}
                        <ListItem style={{ padding: 0 }}>
                          <ListItemText
                            style={{ padding: 0, margin: 0 }}
                            primary={`From ${value.from}`}
                            secondary={moment(
                              `${convertTimestamp(value.createdAt)}`
                            ).fromNow()}
                          />
                        </ListItem>
                        {/* </List> */}
                      </Alert>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{value.message}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialogue
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        open={open}
        handleSubmit={handleSubmit}
        sendNotifications={sendNotifications}
        control={control}
        errors={errors}
      />
    </div>
  );
}
