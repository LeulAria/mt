import React, {useState} from 'react'
import { Container, Box, TextField, Select, Grid, Typography, Button, FormControl, OutlinedInput, Paper, RadioGroup, FormControlLabel, Radio, Divider } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { IUser } from './interface'
import { useStyles } from './style'


const Registration = () => {
    const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName ] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [ business, setBusinessName] = useState('')
  const [ service, setSevice] = useState('')


    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            Country: country,
            City: city,
            Business: business,
            Service: service
          };

          console.log(data);
          
    }
   
    return (
        <div>
              
        <Container>
       <main className={classes.layout}>
       <Paper className={classes.paper}>
           
        <form noValidate onSubmit={handleSubmit}>
        <Grid container direction={'row'} justify={'center'} alignItems={"center"} spacing={5} >
            
            <Grid xs={12}>

              <Box textAlign={"center"}>
            <Typography variant={"h4"}  className={classes.title}>Registration</Typography>
              </Box>
<Divider  className={classes.divider} />
              
            </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={5}>
              <TextField
                required
                id="fullName"
                label="First Name"
                name="fullName"
                // variant="outlined"
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
                // variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
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
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
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
                fullWidth
                onChange={(e) => setCity(e.target.value)}
                color="secondary"
              />
            </Box>
            <Typography>Provided Service Type</Typography>
            <FormControl>
          <RadioGroup row aria-label="position" name="position" onChange={(e) => setSevice(e.target.value) } defaultValue="top" >
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