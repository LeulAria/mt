import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { getUser, sendNotification } from "../../../features/auth/actions";
import { RootState } from "../../../app/store";
import { useForm } from "react-hook-form";
import MUIDataTable from "mui-datatables";

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
    marginTop: "9rem",
  },
}));
const LatestOrders = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();
  const clients = useSelector((state: RootState) => state.auth.clients);
  const data = clients.filter((user) => {
    return user.role == "USER";
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
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
        sort: false,
      },
    },
    {
      label: "Company Url",
      name: "companyUrl",
      options: {
        filter: true,
        sort: false,
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
      label: "Phone Number",
      name: "phoneNumber",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const options = {
    filter: false,
    print: false,
    selectableRowsHideCheckboxes: true,
    // onRowClick: (event: any, rowData: any) => {
    //   getIndex(event);
    //   getRowData((rowData = event));
    // },
  };

  const sendNotifications = (data: any) => {
    const message = {
      ...data,
      ...currentUser,
    };
    dispatch(sendNotification(message));
    handleClose();
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={classes.root}>
      <MUIDataTable
        title={"Client List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default LatestOrders;
