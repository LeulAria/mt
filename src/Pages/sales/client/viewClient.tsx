import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Slide from "@material-ui/core/Slide";
import firebase from "../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppThunk, RootState } from "../../../app/store";
import EditIcon from "@material-ui/icons/Edit";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { TransitionProps } from "@material-ui/core/transitions";
import { sendVerification, getUser } from "../../../features/auth/actions";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { IUser } from "../../../features/auth/types";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Item extends IUser {
  name: string;
  email: string;
  id: string;
}

interface ChildProps {
  open: boolean;
  handleClose: any;
  selectedRow: Item[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    formControl: {
      width: "100%",
    },
  })
);

const ViewClient: React.FC<ChildProps> = (props: any) => {
  const [rowData, getRowData] = React.useState([]);
  const classes = useStyles();
  const [editInfo, getEditInfo] = useState(false);
  const { control, handleSubmit } = useForm();
  // const [open, setOpen] = React.useState(false);
  const [stat, getStatus] = useState("");
  const dispatch = useDispatch();

  const handleEditInfo = () => {
    getEditInfo(true);
  };
  const stateClient = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const fullInfo = stateClient.clients.filter((u) => {
    return props.selectedRow[3] == u.id;
  });
  console.log(stateClient.clients, "view CLi");

  const onSubmit = (data: any) => {
    data.email = fullInfo[0].email;
    console.log(data, rowData, "data");

    dispatch(sendVerification(data));

    const updatedUser = {
      ...data,
    };
    const db = firebase.firestore();
    db.collection("clients")
      .doc(fullInfo[0].id)
      .update(updatedUser)
      .then((_) => {
        console.log("");
      });
    stateClient.clients;
    getStatus(data.verification_status);
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {fullInfo[0] ? fullInfo[0].companyName : null} Detail Information
            </Typography>
            <Tooltip title="Edit Detail">
              <IconButton autoFocus color="inherit" onClick={handleEditInfo}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Divider />
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label>Company Name: </label>

              <TextField
                required
                value={fullInfo[0] ? fullInfo[0].companyName : ""}
                disabled
                variant="outlined"
                placeholder="Company Name"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label>Email: </label>

              <TextField
                required
                id="email"
                name="email"
                value={fullInfo[0] ? fullInfo[0].email : ""}
                disabled
                variant="outlined"
                placeholder="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Company Url: </label>

              <TextField
                required
                value={fullInfo[0] ? fullInfo[0].companyUrl : null}
                disabled
                variant="outlined"
                placeholder="Company Name"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label>Service: </label>

              <TextField
                required
                id="email"
                name="email"
                value={fullInfo[0] ? fullInfo[0].service : ""}
                disabled
                variant="outlined"
                placeholder="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Business: </label>

              <TextField
                required
                value={fullInfo[0] ? fullInfo[0].business : ""}
                disabled
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label>Phone No: </label>

              <TextField
                required
                id="email"
                value={fullInfo[0] ? fullInfo[0].phoneNumber : ""}
                disabled
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <br />
          <Divider />
          <Divider />
          <br />
          {editInfo == true ? (
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/* <Grid container direction='row' spacing={1}> */}

                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        id="country"
                        {...field}
                        placeholder="Country"
                        variant="outlined"
                        // value={stateClient.selectedUserData[0].country}
                        fullWidth
                      />
                    )}
                    // rules={{ required: true }}
                    defaultValue=""
                    name="country"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        id="city"
                        {...field}
                        // value={stateClient.selectedUserData[0].city}
                        placeholder="City"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    // rules={{ required: true }}
                    defaultValue=""
                    name="city"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        id="subCity"
                        {...field}
                        // value={stateClient.selectedUserData[0].subCity}
                        placeholder="Sub-City"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    // rules={{ required: true }}
                    defaultValue=""
                    name="subCity"
                    control={control}
                  />
                </Grid>
                {/* </Grid> */}

                {/* <label>Payment</label> */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        id="paymentStat"
                        {...field}
                        placeholder="Payment Status"
                        variant="outlined"
                        // value={stateClient.selectedUserData[0].paymentStat}
                        fullWidth
                      />
                    )}
                    // rules={{ required: true }}
                    defaultValue=""
                    name="paymentStat"
                    control={control}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        id="tinNumber"
                        {...field}
                        placeholder="Tin Number"
                        variant="outlined"
                        // value={stateClient.selectedUserData[0].tinNumber}
                        fullWidth
                      />
                    )}
                    // rules={{ required: true }}
                    defaultValue=""
                    name="tinNumber"
                    control={control}
                  />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  // className={classes.submit}
                >
                  Update
                </Button>
              </Grid>
            </form>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewClient;
