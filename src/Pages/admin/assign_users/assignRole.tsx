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
import { IUser, UserRole } from "../../../features/auth/types";
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
    submit: {
      margin: "3% 2%",
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
    return props.selectedRow[1] == u.id;
  });
  const onSubmit = (data: any) => {
    console.log(data, fullInfo[0], stat, "data");

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
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="simple-dialog-title"> Edit Role </DialogTitle>

        <Divider />
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <label>Email: </label>
              <TextField
                required
                value={fullInfo[0] ? fullInfo[0].email : ""}
                disabled
                variant="outlined"
                placeholder="Email"
                fullWidth
              />
            </Grid>
          </Grid>
          <br />
          <Divider />
          <Divider />
          <br />
          {/* {editInfo == true ? ( */}
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* <Grid container direction='row' spacing={1}> */}

              <Grid item xs={12} sm={12}>
                <Controller
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        style={{ backgroundColor: "#fff" }}
                        {...field}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // label="Gender"
                      >
                        {Object.keys(UserRole).map((role, key) => {
                          if (
                            UserRole[role] != "ADMIN" &&
                            UserRole[role] != "USER"
                          ) {
                            console.log(UserRole[role], "afraid");

                            return (
                              <MenuItem value={UserRole[role]} key={key}>
                                {UserRole[role]}
                              </MenuItem>
                            );
                          }
                        })}
                      </Select>
                    </FormControl>
                  )}
                  name="role"
                  control={control}
                  defaultValue="SALES_SUPPORT"
                />
                {/* <Controller
                  render={({ field }) => (
                    <TextField
                      required
                      value={fullInfo[0] ? fullInfo[0].role : ""}
                      variant="outlined"
                      placeholder="Role"
                      fullWidth
                    />
                  )}
                  // rules={{ required: true }}
                  defaultValue=""
                  name="country"
                  control={control}
                /> */}
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Update
              </Button>
            </Grid>
          </form>
          {/* ) : (
            ""
          )} */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewClient;
