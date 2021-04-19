import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
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

const LatestOrders = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.auth.clients);
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
    <div>
      <Card
        {...props}
        style={{
          margin: "2rem",
        }}
      >
        <CardHeader title="Clients List" />
        <Divider />
        <PerfectScrollbar>
          <Box style={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Company Url</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Email
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow hover key={client.id}>
                    <TableCell>{client.companyName}</TableCell>
                    <TableCell>{client.companyUrl}</TableCell>
                    <TableCell>
                      {/* {moment(client.last_send).format('DD/MM/YYYY')} */}
                      {client.email}
                    </TableCell>
                    <TableCell>{client.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default LatestOrders;
