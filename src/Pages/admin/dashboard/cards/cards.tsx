import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Theme,
} from "@material-ui/core";
import Chart from "./chart";
import StatPanel from "./statPanel";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { cards } from "../../../../constants/dashboardCards";
import LatestOrders from "../usersList/index";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: "3rem",
  },
}));

export default function Cards() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container justify="center" spacing={5}>
        {cards.map((value, index) => (
          <Grid item md={4} xs={10} key={index}>
            <StatPanel
              title={value.title}
              value={value.value}
              icons={value.icon}
              colors={value.color}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={5}>
        {/* <Grid item xs={4}>
                    <Card style={{ height: '' }}>
                        <Box fontWeight={700} fontSize="20px" py={3} textAlign="center">Users Statistics</Box>
                        <Divider />
                        <Chart />
                        <Box height={30} />
                    </Card>
                </Grid> */}
        <Grid item xs={12}>
          <LatestOrders />
        </Grid>
      </Grid>
    </Container>
  );
}
