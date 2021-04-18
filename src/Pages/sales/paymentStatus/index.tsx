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
  FormControlLabel,
  IconButton,
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

export default function UserPayment() {
  const { control, handleSubmit } = useForm();
  // const [stat, getStatus] = useState("");
  const classes = useStyles();
  const [rowData, getRowData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      label: "Company Name",
      name: "companyName",
      options: {
        filter: true,
      },
    },
    {
      label: "Company URL",
      name: "companyUrl",
      options: {
        filter: true,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: true,
        sort: false,
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

    {
      label: "Payment Status",
      name: "paymentStat",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: function customRender(
          dataIndex: any,
          rowIndex: any
        ) {
          return (
            <FormControlLabel
              control={
                <Switch
                  checked={state}
                  onChange={handleClickOpen}
                  name="checkedB"
                  value={state}
                  color="secondary"
                />
              }
              label="Payed"
            />
          );
        },
      },
    },

    {
      label: "Suspend User",
      name: "suspend",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: function customRender(
          dataIndex: any,
          rowIndex: any
        ) {
          return (
            <IconButton>
              <PersonAddDisabledIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    onRowClick: (event: any, rowData: any) => {
      console.log("eventtts", event, rowData, typeof rowData);
      getRowData((rowData = event));
    },
  };

  const stateClient = useSelector((state: RootState) => state.auth);
  console.log(stateClient.clients, "--cli");

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onSubmit = (data: any) => {
    const currentDate = new Date();
    data.clientName = rowData[0];
    data.email = rowData[2];
    data.id = rowData[3];
    data.dateOfPayment = currentDate;
    data.expiryDate = date.addDays(currentDate, 30);
    data.reminderExpiryDate = date.addDays(currentDate, 28);
    setState(true);
    handleClose();
    dispatch(paymentOfUser(data));
  };

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <MUIDataTable
        title={"Payment status"}
        data={stateClient.clients}
        columns={columns}
        options={options}
      />

      <Dialog
        open={open}
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
}
