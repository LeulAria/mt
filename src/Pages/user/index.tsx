import React, { useEffect, useState  } from 'react'
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../firebase/firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { getUser, sendVerification } from '../../features/auth/actions';
import { AppThunk, RootState } from '../../app/store';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Chip } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  }));
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function User() {
    const { control, handleSubmit } = useForm();
    const [ stat, getStatus] = useState('')
    const classes = useStyles()
    const [rowData, getRowData] = useState([])
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
   
    const columns = [
        {
            label: 'Company Name',
            name: 'companyName',
            options: {
                filter: true,
        
              }
        },
        {
            label: 'Company URL',
            name: 'companyUrl',
            options: {
                filter: true,
              }
        },
        {
            label: 'Email',
            name: 'email',
            options: {
                filter: true,
                sort: false
              }
        },
        {
            label: 'Phone Number',
            name: 'phoneNumber',
            options: {
                filter: true,
                sort: false
              }
        },
        {
            label: 'Role',
            name: 'role',
            options: {
                filter: true,
                sort: false
              }
        },
        {
            label: 'Service',
            name: 'service',
            options: {
                filter: true,
              }
        },
        {
            label: 'UID',
            name: 'uid',
            options: {
                filter: true,
                display:false
              }
        },
        {
            label: 'Verification Status',
            name: 'verification_status',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
                    console.log(dataIndex);
                    
                  return (
                    <Chip
                        variant="outlined"
                        size="small"
                        label={stat ? stat : "loading"}
                        color="secondary"
                        // onClick={handleClick}
                  />
                  );
                }

              
              }
        },
        {
            label: 'Payment Status',
            name: 'paymentStat',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
                    console.log(dataIndex);
                    
                  return (
                    <Chip
                        variant="outlined"
                        size="small"
                        label={stat ? stat : "pending"}
                        color="secondary"
                        // onClick={handleClick}
                  />
                  );
                }          
              }
        },
        {
            name: 'Edit',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
                    console.log(dataIndex);
                    
                  return (
                      <IconButton onClick={ handleClickOpen }>
                          <EditIcon />
                      </IconButton>
                  );
                }
              }
        },
        {
            label: 'Suspend User',
            name: 'suspend',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
                    console.log(dataIndex);
                    
                  return (
                      <IconButton >
                          <PersonAddDisabledIcon />
                      </IconButton>
                  );
                }
              }
        },   
    ]

    const options = {
      filter: true,
      onRowClick: (event: any, rowData: any) => {
          console.log('eventtts', event, rowData, typeof rowData);
          getRowData(rowData = event)
          
        }
    };

    const stateClient = useSelector((state: RootState) => state.auth)
    console.log(stateClient.clients, '--cli');


    useEffect(() => {
        dispatch(getUser())
    },[])


    
    const onSubmit = (data) => {
        data.email = rowData[2]
        
        dispatch(sendVerification(data))

        alert(JSON.stringify(data));
        const updatedUser = {
            ...data
        }
            const db =  firebase.firestore();
            db.collection('clients').doc(rowData[6]).update(updatedUser).then((_)=>{
            })
        stateClient.clients
        getStatus(data.verification_status)
        console.log(getStatus, stat, '0000');
        
    };


    return (
        <div >
            <MUIDataTable 
                title={"Client List"} 
                data={stateClient.clients} 
                columns={columns} 
                options={options} 
            />
            
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Edit Client Information"}</DialogTitle>
            <Divider />
            <Divider />
            <DialogContent>
            

            <Grid container spacing={2} >
           
            <Grid item xs={12} sm={6}>
                <label>Company Name: </label>
                    
                    <TextField
                    required
                    value={rowData[0]}
                    disabled
                    variant='outlined'
                    placeholder="Company Name"
                    fullWidth
                    />
   
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <label>Email: </label>

                <TextField
                required
                id="email"
                name="email"
                value={rowData[2]}
                disabled
                variant='outlined'
                placeholder="Email"
                fullWidth
                />
            </Grid>
            </Grid>
            <br />
            <Divider />
            <Divider />
            <br />
            <form  noValidate onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={2} >
            
            {/* <Grid container direction='row' spacing={1}> */}
         
                <Grid item xs={12} sm={6}>
                    <Controller render={({field}) => (
                        <TextField
                        required
                        id="country"
                        {...field}
                        placeholder="Country"  
                        variant='outlined'
                        fullWidth
                        />

                    )}
                    name="country"
                    control={control}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller render={({field}) => (
                        <TextField
                        required
                        id="city"
                        {...field}
                        placeholder="City"  
                        variant='outlined'
                        fullWidth

                        />
                    )}
                    name="city"
                    control={control}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller render={({field}) => (
                        <TextField
                        required
                        id="subCity"
                        {...field}
                        placeholder="Sub-City"  
                        variant='outlined'
                        fullWidth

                        />

                    )}
                    name="subCity"
                    control={control}
                    />
                </Grid>
            {/* </Grid> */}
            
            {/* <label>Payment</label> */}
                <Grid item xs={12} sm={6}>
                    <Controller render={({field}) => (
                        <TextField
                        required
                        id="paymentStat"
                        {...field}
                        placeholder="Payment Status"  
                        variant='outlined'
                        fullWidth

                        />

                    )}
                    name="paymentStat"
                    control={control}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>

              

                    <Controller render={({field}) => (
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Amount Payed</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                {...field}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                                fullWidth
                            />
                    </FormControl>

                        // <TextField
                        // required
                        // id="amount"
                        // placeholder="Amount Payed"  
                        // variant='outlined'

                        // />

                    )}
                    name="amount"
                    control={control}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller render={({field}) => (
                        <TextField
                        required
                        id="subscription"
                        {...field}
                        placeholder="Subscription"  
                        variant='outlined'
                        fullWidth

                        />

                    )}
                    name="subscription"
                    control={control}
                    />
                </Grid>
            
            <Grid item xs={12} sm={6}>
                <Controller render={({field}) => (
                    <TextField
                    required
                    id="tinNumber"
                    {...field}
                    placeholder="Tin Number"  
                    variant='outlined'
                    fullWidth
                    />

                )}
                name="tinNumber"
                control={control}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Controller render = {({field}) => (

                 <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                   Verification Status    

                    </InputLabel>
                    <Select
                      style={{ backgroundColor: "#fff" }}
                      {...field}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Gender"
                    >
                      <MenuItem value={"NOT_VERIFIED"}>Not Verified</MenuItem>
                      <MenuItem value={"PENDING"}>Pending</MenuItem>
                      <MenuItem value={"VERIFIED"}>Verified</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name='verification_status' 
                control={control}
                defaultValue="NOT_VERIFIED"
                />
                          
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained" 
                color="secondary"
                className={classes.submit}
                >
                Update
                </Button>
            
            </Grid>
                </form>
           
            </DialogContent>
          </Dialog>
        </div>

    )

}
