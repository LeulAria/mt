import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  getPayedUserInfo,
  getUser,
  sendVerification,
} from "../../../features/auth/actions";
import { AppThunk, RootState } from "../../../app/store";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Chip } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SubscriptionDate() {
  const { control, handleSubmit } = useForm();
  const [stat, getStatus] = useState("");
  const classes = useStyles();
  const [rowData, getRowData] = useState([]);
  const [index, getIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openChip, setOpenChip] = React.useState(false);
  const SPACED_DATE_FORMAT = "DD MMM YYYY";
  // inetrface items{
  //   open: Boolean;
  // }
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenView = () => {
    setOpenView(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickChip = () => {
    setOpenChip(true);
  };

  const handleSuspend = (u: any) => {
    console.log(u, "----");
    u.flaged = true;
    setOpen(false);
  };

  const columns = [
    {
      label: "Company Name",
      name: "clientName",
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
      label: "Date Of Payment",
      name: "dateOfPayment",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) => moment(new Date(value)).format(),
      },
    },
    {
      label: "Expiry Date",
      name: "expiryDate",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) =>
          moment(new Date(value)).format(SPACED_DATE_FORMAT),
      },
    },
    {
      label: "Reminder",
      name: "reminderExpiryDate",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) => moment(new Date(value)).fromNow(),
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
    filter: true,
    selectableRowsHideCheckboxes: false,
    onRowClick: (event: any, rowData: any) => {
      console.log("eventtts", event, rowData, typeof rowData);
      getIndex(event);
      getRowData((rowData = event));
    },
  };

  const stateClient = useSelector((state: RootState) => state.auth);
  console.log(
    // moment(stateClient.clients[0].dateOfPayment.toDate()).fromNow(),
    rowData,
    stateClient.clients[0],
    "--cl====i"
  );

  useEffect(() => {
    dispatch(getPayedUserInfo());
  }, []);

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      table
      {/* <MUIDataTable
        title={"Subscription List"}
        data={stateClient.clients}
        columns={columns}
        options={options}
      /> */}
    </div>
  );
}
