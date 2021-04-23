import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  Grid,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  TextField,
  CardHeader,
} from "@material-ui/core";
import Select from "react-select";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useForm, Controller } from "react-hook-form";
import { FormControl } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { sendNotification, setLoadingProgress } from "../../../features/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(4),
        // height: theme.spacing(16),
      },
    },
    card: {
      marginTop: "4%",
    },
    roots: {
      minWidth: "60vw",
      minHeight: "50vh",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    btn: {
      float: "right",
      marginTop: "5%",
      marginBottom: "5%",
    },
  })
);

export default function Index() {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const stateClient = useSelector((state: RootState) => state.auth);

  const data = stateClient.clients.filter((user) => {
    return user.role != "ADMIN";
  });
  const options = data.map((userData) => {
    return { value: userData.uid, label: userData.companyName };
  });
  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    const message: any = {
      messageType: data.messageType,
      notificationMessage: data.notificationMessage,
      uid: data.uid.value,
    };
    dispatch(sendNotification(message));
    // dispatch(setLoadingProgress(true));

    reset();
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.card}
      >
        <Grid item xs={12} sm={12}>
          <Paper variant="outlined">
            {" "}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Card className={classes.roots} variant="outlined">
                <CardHeader title="Send Notification" />
                <CardContent>
                  <Grid>
                    <Controller
                      name="uid"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={options}
                          {...field}
                          placeholder="All User list"
                        />
                      )}
                      rules={{
                        required: "this field is required",
                      }}
                    />
                  </Grid>
                </CardContent>
                <CardContent>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.card}
                  >
                    Please enter your notification message here. Notify your
                    employee with updates occasionally.
                  </Typography>
                  <Grid className={classes.card}>
                    <Grid>
                      <Controller
                        name="notificationMessage"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            autoFocus
                            {...field}
                            margin="dense"
                            multiline
                            label="Message"
                            type="text"
                            fullWidth
                            error={errors.notificationMessage}
                            required
                            helperText={
                              errors.notificationMessage
                                ? errors.notificationMessage.message
                                : null
                            }
                          />
                        )}
                        rules={{
                          required: "this field is required",
                        }}
                      />
                    </Grid>

                    <Grid>
                      <Controller
                        name="messageType"
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <InputLabel>Message Type</InputLabel>
                            <MuiSelect
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              {...field}
                              name="solutions"
                              required
                              variant="standard"
                              placeholder="Services"
                              error={errors.messageType}
                            >
                              <MenuItem value={"info"}>Information</MenuItem>
                              <MenuItem value={"warning"}>Warning</MenuItem>
                              <MenuItem value={"success"}>Succuss</MenuItem>
                              <MenuItem value={"error"}>Error</MenuItem>
                            </MuiSelect>
                            <FormHelperText style={{ color: "red" }}>
                              {errors.messageType
                                ? errors.messageType.message
                                : null}
                            </FormHelperText>
                          </FormControl>
                        )}
                        control={control}
                        rules={{
                          required: "this field is required",
                        }}
                      />
                    </Grid>
                    <Grid className={classes.btn}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
