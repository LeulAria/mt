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
import {
  sendVerification,
  getUser,
  createNewEmployee,
  createNewUser,
} from "../../../features/auth/actions";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { IUser, UserRole } from "../../../features/auth/types";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CustomizedSnackbars from "../../../components/snackbar";

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
      marginBottom: "2%",
      marginTop: "2%",
      maxWidth: "40%",
      marginRight: "auto",
      marginLeft: "auto",
      display: "flex",
    },
  })
);

const AddEmployee: React.FC<ChildProps> = (props: any) => {
  const [rowData, getRowData] = React.useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [editInfo, getEditInfo] = useState(false);
  const { control, handleSubmit } = useForm();
  // const [open, setOpen] = React.useState(false);
  const [stat, getStatus] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const stateClient = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onSubmit = (data: any) => {
    console.log(data, createNewEmployee(data), "data");

    dispatch(createNewEmployee(data));

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
              Add Employee
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />
        <Divider />
        <DialogContent>
          <br />
          {/* {editInfo == true ? ( */}
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* <Grid container direction='row' spacing={1}> */}
              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="firstName"
                      {...field}
                      placeholder="First Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  // rules={{ required: true }}
                  defaultValue=""
                  name="firstName"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="lastName"
                      {...field}
                      // value={stateClient.selectedUserData[0].city}
                      placeholder="Last Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  // rules={{ required: true }}
                  defaultValue=""
                  name="lastName"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="userName"
                      {...field}
                      // value={stateClient.selectedUserData[0].city}
                      placeholder="User Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  rules={{ required: true }}
                  defaultValue=""
                  name="userName"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="email"
                      {...field}
                      placeholder="Email"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  defaultValue=""
                  name="email"
                  control={control}
                />
              </Grid>

              <Divider />
              <Divider />
              <Grid item xs={12} sm={12}>
                <Controller
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel>Role</InputLabel>
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
                  defaultValue="TECH_SUPPORT"
                />
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
      <CustomizedSnackbars
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        type={type}
        message="Successfully Registered"
      />
    </div>
  );
};

export default AddEmployee;
