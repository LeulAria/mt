import React from "react";
import moment from "moment";
// import { v4 as uuid } from 'uuid';
import { v4 as uuid } from "uuid";
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
import { RootState } from "../../../../app/store";

const LatestOrders = (props: any) => {
  const clients = useSelector((state: RootState) => state.auth.clients);
  const data = clients.filter((user) => {
    return user.role != "USER";
  });

  return (
    <div>
      <Card
        {...props}
        style={{
          margin: "2rem",
        }}
      >
        <CardHeader title="Employe List" />
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
                {data.map((client) => (
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
