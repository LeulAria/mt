import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { collection } from "rxfire/firestore";
import { map } from "rxjs/operators";
import firebase from "../../../firebase/firebase";
import moment from "moment";
import { convertTimestamp } from "convert-firebase-timestamp";

const Subscription = (props: any) => {
  const [user, setUser] = useState<any>([]);

  const SPACED_DATE_FORMAT = "DD MMM YYYY";

  useEffect(() => {
    const db = firebase.firestore();
    const collectionRef = db.collection("paymentStatus");

    collection(collectionRef)
      .pipe(map((docs) => docs.map((d) => d.data())))
      .subscribe((users: any) => {
        console.log(users, "heyy");

        setUser([...users]);
      });
  }, []);
  return (
    <div>
      <Card
        {...props}
        style={{
          margin: "2rem",
        }}
      >
        <CardHeader title="Subscription" />
        <Divider />
        <Box style={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client Name</TableCell>
                <TableCell>Date of payment</TableCell>
                <TableCell sortDirection="desc">Expiry Date</TableCell>
                <TableCell>Reminder</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                user.map((client: any, index: number) => (
                  <TableRow hover key={index}>
                    <TableCell>{client.clientName}</TableCell>
                    <TableCell>
                      {moment(
                        `${convertTimestamp(client.dateOfPayment)}`
                      ).format(SPACED_DATE_FORMAT)}
                    </TableCell>
                    <TableCell>
                      {moment(`${convertTimestamp(client.expiryDate)}`).format(
                        SPACED_DATE_FORMAT
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(
                        `${convertTimestamp(client.reminderExpiryDate)}`
                      ).fromNow()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
          }}
        ></Box>
      </Card>
    </div>
  );
};

export default Subscription;
