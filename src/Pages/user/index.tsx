import React, { useEffect, useState  } from 'react'
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getUser } from '../../features/auth/actions';
import { RootState } from '../../app/store';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Chip } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form'

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
                        label="Not Verified"
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
       
    ]
    const options = {
      filter: true,
      onRowClick: (event: any, rowData: any) => {
          console.log('eventtts', event, rowData);
          getRowData(rowData = event)
          
        }
    };

    const state = useSelector((state: RootState) => state.auth)
    console.log(state.clients, '--cli');


    useEffect(() => {
        dispatch(getUser())
    },[])
  
    
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        console.log(data);
      };

      
    return (
        <div >
            <MUIDataTable 
                title={"Added Client List"} 
                data={state.clients} 
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
             {
                 console.log(rowData, '0000')
                 
             }
            
            <DialogTitle id="alert-dialog-slide-title">{"Edit Client Information"}</DialogTitle>
            <DialogContent>
            <form  noValidate onSubmit={handleSubmit(onSubmit)} >

            <Grid container spacing={3}>
           
            <Grid item xs={12}>
                <label>Company Name: </label><br />
                    
                    <TextField
                    required
                    value={rowData[0]}
                    disabled
                    variant='outlined'
                    placeholder="Company Name"
                    fullWidth
                    />
   
            </Grid>
            
            <Grid item xs={12}>
            <label>Email: </label><br />

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
                name='Verification Status' 
                control={control}
                defaultValue="NOT_VERIFIED"
                />
                          
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
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
