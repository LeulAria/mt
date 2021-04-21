import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import date from "date-and-time";
import { TransitionProps } from "@material-ui/core/transitions";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import { getUser, paymentOfUser } from "../../../features/auth/actions";
import { RootState } from "../../../app/store";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Item {
  name: string;
  email: string;
}
interface ChildProps {
  open: boolean;
  selectedRow: Item[];
  handleClickChip: any;
}

const PaymentStat: React.FC<ChildProps> = (props) => {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const [rowData, getRowData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const stateClient = useSelector((state: RootState) => state.auth);
  console.log(stateClient.clients, props, "--cli");

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onSubmit = (data: any) => {
    const currentDate = new Date();
    data.clientName = props.selectedRow[0];
    data.email = props.selectedRow[1];
    data.id = props.selectedRow[3];
    data.dateOfPayment = currentDate;
    data.expiryDate = date.addDays(currentDate, 30);
    data.reminderExpiryDate = date.addDays(currentDate, 28);
    setState(true);
    handleClose();
    dispatch(paymentOfUser(data));
    props.handleClickChip();
  };

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Verification"}
        </DialogTitle>
        <Divider />
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <label>Company Name: </label>

              <TextField
                required
                value={props.selectedRow[0]}
                disabled
                variant="outlined"
                placeholder="Company Name"
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
              <Grid item xs={12} sm={12}>
                <Controller
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Verification
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
                  name="verification"
                  control={control}
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox {...field} value={state} name="checkedA" />
                      }
                      label="Grant Access for Tech Support"
                    />
                  )}
                  name="techSupportAccess"
                  control={control}
                  defaultValue="false"
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PaymentStat;
