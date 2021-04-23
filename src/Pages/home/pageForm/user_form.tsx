import React, { useState } from "react";
import { Box, Button, Paper, CircularProgress } from "@material-ui/core";
import Solutions from "./solutionTypes";
import "./style.css";
import { ReactComponent as Safe } from "../../../assets/icons/registration/Wekeepyourdatasafe.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setLoadingProgress } from "../../../features/auth";
import emailjs from "emailjs-com";
import Snackbar from "../../../components/snackbar/index";
import { useForm, Controller } from "react-hook-form";
import { landingPageForm } from "../../../constants/userForm";
import TextComponent from "../../../components/textField";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
    },
  },
  parent: {
    width: "100%",
    borderRadius: "0",
  },
  regBtn: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    background: `linear-gradient(45deg, #0088D6 30%, #00CDB8 90%)`,
    color: "white",
    fontSize: "14px",
    textTransform: "none",
    letterSpacing: "1px",
  },
  wrapper: {
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  buttonProgress: {
    color: "yellow",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  checkBoxContainer: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "7rem",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  icon: {
    color: `linear-gradient(45deg, #0088D6 30%, #00CDB8 90%)`,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginLeft: "-0.2rem",
  },
}));

export default function PageForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [message, setMessage] = useState("false");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const sendEmail = (data: any, e: any) => {
    console.log(data, e, "landing page"), dispatch(setLoadingProgress(true));
    emailjs
      .sendForm(
        "service_ksd1yt9",
        "template_v1h99b8",
        e.target,
        "user_KPnW8Osdn6iqUibLu4tVP"
      )

      .then(
        (result) => {
          dispatch(setLoadingProgress(false));
          setType("success");
          setMessage("Information sent successfully");
          setOpen(true);
        },
        (error) => {
          dispatch(setLoadingProgress(false));
          setType("error");
          setMessage("Something went wrong pleas try again");
          setOpen(true);
        }
      );
    reset();
  };
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        width="100%"
        height="100%"
        className={classes.parentBox}
      >
        <Paper className={classes.parent} elevation={4}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box mt={4} display="flex" justifyContent="center">
              <Box className="title">Registration</Box>
            </Box>
            <form noValidate onSubmit={handleSubmit(sendEmail)}>
              {landingPageForm.map((value, index) => (
                <Box px={7} py={1} key={index}>
                  <Controller
                    name={value.name}
                    render={({ field }) => (
                      <TextComponent
                        label={value.label}
                        field={field}
                        errors={errors}
                        name={value.name}
                        type={value.type}
                        variant={value.variant}
                      />
                    )}
                    control={control}
                    rules={value.rules}
                  />
                </Box>
              ))}
              <Box px={7} py={1}>
                <Controller
                  name="solutions"
                  render={({ field }) => (
                    <Solutions field={field} errors={errors} />
                  )}
                  control={control}
                  rules={{
                    required: "this field is required",
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mt={3}
                px={10}
              >
                <div className={classes.wrapper}>
                  <Button
                    className={classes.regBtn}
                    fullWidth
                    size="large"
                    type="submit"
                    disabled={auth.isLoading ? true : false}
                  >
                    Register
                  </Button>
                  {auth.isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                my={3}
                px={10}
              >
                <Box mx={1}>
                  <Safe />
                </Box>
                <Box fontWeight={700} fontSize="13px">
                  We Keep Your Data Safe
                </Box>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        type={type}
        message={message}
      />
    </div>
  );
}
