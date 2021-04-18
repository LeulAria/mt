import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Slide from "@material-ui/core/Slide";
import firebase from "../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppThunk, RootState } from "../../../app/store";
import { TransitionProps } from "@material-ui/core/transitions";
import { sendVerification, getUser } from "../../../features/auth/actions";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Item {
  amount: string;
  city: string;
  companyName: string;
  companyUrl: string;
  country: string;
  email: string;
  isOnline: false;
  paymentStat: string;
  phoneNumber: string;
  role: string;
  service: string;
  subCity: string;
  subscription: string;
  tinNumber: string;
  verification_status: string;
}
interface ChildProps {
  open: boolean;
  selectedRow: Item[];
}

const ViewClient: React.FC<ChildProps> = (props) => {
  const [rowData, getRowData] = React.useState([]);
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);
  const [stat, getStatus] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const stateClient = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  console.log(props, "propss");

  const onSubmit = (data: any) => {
    data.email = rowData[2];

    dispatch(sendVerification(data));

    alert(JSON.stringify(data));
    const updatedUser = {
      ...data,
    };
    const db = firebase.firestore();
    db.collection("clients")
      .doc(rowData[6])
      .update(updatedUser)
      .then((_) => {
        console.log("");
      });
    stateClient.clients;
    getStatus(data.verification_status);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Edit Client Information"}
        </DialogTitle>
        <Divider />
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label>Company Name: </label>

              <TextField
                required
                value={rowData[0]}
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
                value={rowData[2]}
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* <Grid container direction='row' spacing={1}> */}

              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      required
                      id="country"
                      {...field}
                      placeholder="Country"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  name="country"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      required
                      id="city"
                      {...field}
                      placeholder="City"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  name="city"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      required
                      id="subCity"
                      {...field}
                      placeholder="Sub-City"
                      variant="outlined"
                      fullWidth
                    />
                  )}
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
                      required
                      id="paymentStat"
                      {...field}
                      placeholder="Payment Status"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  name="paymentStat"
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      required
                      id="tinNumber"
                      {...field}
                      placeholder="Tin Number"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  name="tinNumber"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      //   className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Verification Status
                      </InputLabel>
                      <Select
                        style={{ backgroundColor: "#fff" }}
                        {...field}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Gender"
                      >
                        <MenuItem value={"NOT_VERIFIED"}>Not Verified</MenuItem>
                        <MenuItem value={"PENDING"}>Pending</MenuItem>
                        <MenuItem value={"VERIFIED"}>Verified</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  name="verification_status"
                  control={control}
                  defaultValue="NOT_VERIFIED"
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewClient;
