import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { updadteUserProfile } from "../../features/auth/actions";

const AccountProfileDetails = (props: any) => {
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState("");
  const user = useSelector((state: RootState) => state.auth);
  const current = {
    companyName: user.currentUser.companyName,
    companyUrl: user.currentUser.companyUrl,
    email: user.currentUser.email,
    phoneNumber: user.currentUser.phoneNumber,
    city: user.currentUser.city,
    subCity: user.currentUser.subCity,
    password: user.currentUser.password,
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: current,
  });

  const handleClickShowPassword = () => {
    setVisible("text");
  };
  const dispatch = useDispatch();

  const onsubmit = (data: any) => {
    try {
      dispatch(updadteUserProfile(data));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form autoComplete="off" noValidate {...props} style={{ zIndex: -1 }}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
          action={
            <Button
              color="primary"
              variant="contained"
              onClick={() => setDisabled(!disabled)}
            >
              {disabled ? "Edit" : "Disable"}
            </Button>
          }
        ></CardHeader>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                name="companyName"
                render={({ field }) => (
                  <TextField
                    label="Company Name"
                    fullWidth
                    focused={!disabled}
                    {...field}
                    error={errors.companyName ? true : false}
                    helperText={
                      errors.companyName ? errors.companyName.message : null
                    }
                    type="text"
                    variant="outlined"
                    disabled={disabled}
                  />
                )}
                control={control}
                rules={{
                  required: "this field is required",
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="companyUrl"
                render={({ field }) => (
                  <TextField
                    label="Company Url"
                    {...field}
                    fullWidth
                    focused={!disabled}
                    error={errors.companyUrl ? true : false}
                    helperText={
                      errors.companyUrl ? errors.companyUrl.message : null
                    }
                    type="text"
                    variant="outlined"
                    disabled={disabled}
                  />
                )}
                control={control}
                rules={{
                  required: "this field is required",
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="email"
                render={({ field }) => (
                  <TextField
                    label="Email"
                    fullWidth
                    focused={!disabled}
                    {...field}
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : null}
                    type="email"
                    variant="outlined"
                    disabled={disabled}
                  />
                )}
                control={control}
                rules={{
                  required: "this field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="phoneNumber"
                render={({ field }) => (
                  <TextField
                    label="Phone Number"
                    {...field}
                    fullWidth
                    focused={!disabled}
                    error={errors.phoneNumber ? true : false}
                    helperText={
                      errors.phoneNumber ? errors.phoneNumber.message : null
                    }
                    type="tel"
                    variant="outlined"
                    disabled={disabled}
                    // defaultValue={user.isLoading ? 'loading' : user.user.phoneNumber}
                  />
                )}
                control={control}
                rules={{
                  required: "this field is required",
                  pattern: {
                    value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
                    message: "invalid format",
                  },
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="city"
                render={({ field }) => (
                  <TextField
                    label="City"
                    {...field}
                    fullWidth
                    focused={!disabled}
                    error={errors.city ? true : false}
                    helperText={errors.city ? errors.city.message : null}
                    type="text"
                    variant="outlined"
                    disabled={disabled}
                    // defaultValue={user.isLoading ? 'loading' : user.user.city}
                  />
                )}
                control={control}
                rules={{
                  required: "this field is required",
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="subCity"
                render={({ field }) => (
                  <TextField
                    label="Sub City"
                    {...field}
                    fullWidth
                    focused={!disabled}
                    error={errors.subCity ? true : false}
                    helperText={errors.subCity ? errors.subCity.message : null}
                    type="tel"
                    variant="outlined"
                    disabled={disabled}
                    // defaultValue={user.isLoading ? 'loading' : user.user.subCity}
                  />
                )}
                control={control}
                rules={{
                  required: "this field is required",
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {/* <Controller
                name="password"
                render={({ field }) => (
                  <FormControl
                    variant="outlined"
                    focused={!disabled}\
                  >
                    <InputLabel>PassWord</InputLabel>
                    <Input
                      type={visible}
                      {...field}
                      disabled={disabled}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {visible ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
                control={control}
                rules={{
                  required: "this field is required",
                }}
              /> */}

              <Controller
                name="password"
                render={({ field }) => (
                  <TextField
                    label="Password"
                    {...field}
                    fullWidth
                    type="text"
                    focused={!disabled}
                    error={errors.password ? true : false}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                    variant="outlined"
                    disabled={disabled}

                    // defaultValue={user.isLoading ? 'loading' : user.user.subCity}
                  />
                )}
                control={control}
                rules={{
                  required: "this field is required",
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            style={{
              margin: "1rem",
            }}
            disabled={disabled}
            onClick={handleSubmit(onsubmit)}
          >
            Update Profile
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
