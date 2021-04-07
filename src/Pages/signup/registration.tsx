import React, { useState } from 'react'
import { 
  Container, 
  Box, 
  TextField, 
  Grid, 
  Typography, 
  Button, 
  FormControl, 
  Paper, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Divider, 
  CircularProgress } from '@material-ui/core'
import { useStyles } from './style'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from "../../features/auth";
import { IUser } from "../../features/auth/types";
import { RootState } from '../../app/store';


const Registration = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subCity, setSubCity] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [business, setBusinessName] = useState('')
  const [service, setService] = useState('')
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth)


  const handleSubmit = (e) => {
    e.preventDefault()
    const name = `${firstName} ${lastName}`
    const data: IUser = {
      name,
      email,
      phone,
      password,
      address: {
        country,
        city,
        subCity
      },
      service: service,
      business: business
    };
    dispatch(createNewUser(data))
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setPhone("")
    setCountry("")
    setCity("")
    setSubCity("")
    setBusinessName("")
    setService("")
  }

  return (
    <div>

      <Container maxWidth="md">
        <main>
          <Paper className={classes.paper}>
            <form noValidate onSubmit={handleSubmit}>
              <Grid container direction={'row'} justify={'center'} alignItems={"center"} spacing={5} >

                <Grid xs={12}>

                  <Box textAlign={"center"}>  
                    {auth.isLoading && <CircularProgress/> }
                    <Typography variant={"h4"} className={classes.title}>Registration</Typography>
                  </Box>
                  <Divider className={classes.divider} />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={5}>
                    <TextField
                      required
                      id="fullName"
                      label="First Name"
                      name="fullName"
                      // variant="outlined"
                      value={firstName}
                      fullWidth
                      onChange={(e) => setFirstName(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Box my={4}>
                    <TextField
                      required
                      id="fullName"
                      label="Last Name"
                      name="lastName"
                      // variant="outlined"
                      value={lastName}
                      fullWidth
                      onChange={(e) => setLastName(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Box my={4}>
                    <TextField
                      required
                      id="phone"
                      label="Phone"
                      name="phone"
                      // variant="outlined"
                      value={phone}
                      fullWidth
                      onChange={(e) => setPhone(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Box my={4}>
                    {" "}
                    <TextField
                      required
                      id="email"
                      label="Email"
                      name="email"
                      type="email"
                      // variant="outlined"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Box my={4}>
                    {" "}
                    <TextField
                      required
                      id="password"
                      label="Password"
                      name="password"
                      value={password}
                      type="password"
                      // variant="outlined"
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  {/* </Grid>
          <Grid item xs={12} md={4} spacing={2}> */}
                  {/* <Typography variant={"h4"}>&nbsp;</Typography> */}


                </Grid>
                <Grid item xs={12} sm={6} >

                  <Box mt={4}>
                    {" "}
                    <TextField
                      required
                      id="business"
                      label="Business Name"
                      name="business"
                      // variant="outlined"
                      value={business}
                      fullWidth
                      onChange={(e) => setBusinessName(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Box my={4}>
                    {" "}
                    <TextField
                      required
                      id="country"
                      label="Address"
                      name="address"
                      // variant="outlined"
                      value={country}
                      fullWidth
                      onChange={(e) => setCountry(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Box my={4}>
                    <TextField
                      required
                      id="city"
                      label="City"
                      name="city"
                      // variant="outlined"
                      value={city}
                      fullWidth
                      onChange={(e) => setCity(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Box my={4}>
                    {" "}
                    <TextField
                      required
                      id="subcity"
                      label="Subcity"
                      name="subcity"
                      value={subCity}
                      // variant="outlined"
                      fullWidth
                      onChange={(e) => setSubCity(e.target.value)}
                      color="secondary"
                    />
                  </Box>
                  <Typography>Provided Service Type</Typography>
                  <FormControl>
                    <RadioGroup row aria-label="position" name="position" onChange={(e) => setService(e.target.value)} defaultValue="top" >
                      <FormControlLabel
                        value="API"
                        control={<Radio />}
                        label="API"
                      />
                      <FormControlLabel
                        value="SALES"
                        control={<Radio />}
                        label="Sales"
                      />

                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box my={4} textAlign={"center"}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={auth.isLoading ? true: false}
                    >
                      Register
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </main>
      </Container>
    </div>
  )
}

export default Registration;