import { Box, Theme, Typography } from "@material-ui/core";
import React from "react";
import Chart from "./charts/index";
import Cards from "./cards/cards";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  parent: {
    position: "relative",
    // padding: '3rem'
  },
  title: {
    marginLeft: "4rem",
    marginBottom: "1rem",
  },
}));
export default function Users() {
  const classes = useStyles();
  return (
    <div>
      <Box
        width="100%"
        height="35rem"
        bgcolor="#7367EF"
        color="white"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        pt={5}
        px={10}
        className={classes.parent}
      >
        <Typography variant="h5" className={classes.title}>
          Admins Dashboard Line Chart
        </Typography>
        <Chart />
      </Box>
      <Cards />
    </div>
  );
}
