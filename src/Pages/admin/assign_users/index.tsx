import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { getUser } from "../../../features/auth";
import { RootState } from "../../../app/store";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import ViewClient from "./assignRole";
import AddEmployee from "./addEmployee";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem",
  },
  formControl: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(2),
    float: "right",
    marginTop: "6rem",
  },
}));

export default function Role() {
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
    setOpen(false);
  };

  const columns = [
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
      label: "Current Role",
      name: "role",
      options: {
        filter: true,
        sort: false,
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
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
                onClick={handleClickOpenView}
              >
                Edit Role
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    print: false,
    selectableRowsHideCheckboxes: true,
    onRowClick: (event: any, rowData: any) => {
      getIndex(event);
      getRowData((rowData = event));
    },
  };

  const stateClient = useSelector((state: RootState) => state.auth);

  const data = stateClient.clients.filter((user) => {
    return user.role != "USER" && user.role != "ADMIN";
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={classes.root}>
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
      <ViewClient
        open={openView}
        selectedRow={rowData}
        handleClose={handleClose}
      />
      <AddEmployee
        open={open}
        selectedRow={rowData}
        handleClose={handleSuspend}
      />
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.margin}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
