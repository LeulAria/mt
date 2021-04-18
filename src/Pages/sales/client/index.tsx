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
import { getUser, sendVerification } from "../../../features/auth/actions";
import { AppThunk, RootState } from "../../../app/store";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Chip } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import EditClient from "./editClient";
import PaymentStat from "./paymentStat";
import ViewClient from "./viewClient";
import { IUser } from "../../../features/auth/types";
import { RowingSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function User() {
  const { control, handleSubmit } = useForm();
  const [stat, getStatus] = useState("");
  const classes = useStyles();
  const [rowData, getRowData] = useState([]);
  const [fullRowData, getFullRowData] = useState([]);
  const [index, getIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openChip, setOpenChip] = React.useState(false);

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
      name: "companyName",
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
      label: "Phone Number",
      name: "phoneNumber",
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
      label: "Verification Status",
      name: "verification_status",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: function custom(dataIndex: any, rowIndex: any) {
          return (
            <Chip
              variant="outlined"
              size="small"
              label={rowData[0]}
              color="secondary"
              onClick={handleClickChip}
            />
          );
        },
      },
    },
    {
      label: "Options",
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: function custom(dataIndex: any, rowIndex: any) {
          return (
            <>
              <Tooltip title="Edit Client">
                <IconButton onClick={handleClickOpen}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Detail">
                <IconButton>
                  <VisibilityIcon onClick={handleClickOpenView} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Suspend User">
                <IconButton onClick={handleClickOpen}>
                  <PersonAddDisabledIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    selectableRowsHideCheckboxes: false,
    onRowClick: (event: any, rowData: any) => {
      getIndex(event);
      getRowData((rowData = event));
    },
  };

  const stateClient = useSelector((state: RootState) => state.auth);
  const fullInfo = stateClient.clients.filter((u) => {
    console.log(rowData[3], "uuu");

    return rowData[3] == u.id;
  });

  console.log(
    stateClient.clients,
    rowData,
    fullInfo,
    typeof fullInfo,
    "--OOOOOOOOO--"
  );

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <MUIDataTable
        title={"Client List"}
        data={stateClient.clients}
        columns={columns}
        options={options}
      />

      <PaymentStat open={openChip} selectedRow={rowData} />
      <ViewClient open={openView} selectedRow={rowData} />
      <Dialog
        open={open}
        onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to suspend user {rowData[0]}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSuspend(rowData)} color="primary">
            Suspend
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
