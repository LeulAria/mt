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
import { getUser, setUser } from "../../../features/auth";
import { AppThunk, RootState } from "../../../app/store";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Chip } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
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

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenView = () => {
    setOpenView(true);
  };

  const handleClose = () => {
    setOpenView(false);
  };

  const handleClickChip = () => {
    setOpenChip(true);
  };
  const handleClickChipClose = () => {
    setOpenChip(false);
  };

  const handleSuspend = (u: any) => {
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
        customBodyRender: function custom(value: any, rowIndex: any) {
          return (
            <Chip
              variant="outlined"
              size="small"
              label={value}
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
    selectableRowsHideCheckboxes: true,
    onRowClick: (event: any, rowData: any) => {
      getIndex(event);
      getRowData((rowData = event));
    },
  };

  const stateClient = useSelector((state: RootState) => state.auth);

  if (openView == true) {
    // dispatch(setUser(fullInfo));
  }

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

      <PaymentStat
        open={openChip}
        selectedRow={rowData}
        handleClickChip={handleClickChipClose}
      />

      <ViewClient
        open={openView}
        selectedRow={rowData}
        handleClose={handleClose}
      />
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
