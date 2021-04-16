// import React from 'react'
// import { IconButton, Button, Slide, Dialog, DialogTitle, TextField, DialogContent, Grid   } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
// import { TransitionProps } from '@material-ui/core/transitions';


// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & { children?: React.ReactElement<any, any> },
//     ref: React.Ref<unknown>,
//   ) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

  
// export default function EditInfo() {
//     return (
//         <div>

//             <Dialog
//                 // open={open}
//                 // fullScreen
//                 TransitionComponent={Transition}
//                 keepMounted
//                 // onClose={handleClose}
//                 aria-labelledby="alert-dialog-slide-title"
//                 aria-describedby="alert-dialog-slide-description"
//             >
            
//             <DialogTitle id="alert-dialog-slide-title">{"Edit Client Information"}</DialogTitle>
//             <DialogContent>
//             <form noValidate >

//             <Grid container spacing={3}>

//             <Grid item xs={12} sm={6}>
//                 <TextField
//                 required
//                 id="firstName"
//                 name="firstName"
//                 label="First name"        
//                 // value={rowData[0]}
//                 fullWidth
//                 autoComplete="given-name"
//                 />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField
//                 required
//                 id="lastName"
//                 name="lastName"
//                 label="Last name"      
//                 // value={rowData[2]}
//                 fullWidth
//                 autoComplete="family-name"
//                 />
//             </Grid>
            
//             <Grid item xs={12}>
//                 <TextField
//                 required
//                 id="email"
//                 name="email"
//                 // inputRef={register}
//                 label="Email"
//                 fullWidth
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField
//                 required
//                 id="tinNumber"
//                 name="tinNumber"
//                 // inputRef={register}
//                 label="Tin Number"
//                 fullWidth
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField
//                 required
//                 id="address1"
//                 name="address1"
//                 // inputRef={register}
//                 label="Address line 1"
//                 fullWidth
//                 />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField
//                 required
//                 id="city"
//                 // inputRef={register}
//                 name="city"
//                 label="City"
//                 fullWidth
//                 />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField
//                 required
//                 id="country"
//                 name="country"
//                 label="Country"
//                 // inputRef={register}
//                 fullWidth
//                 autoComplete="shipping country"
//                 />
//             </Grid>
//             <Grid item xs={12} >
//             {/* <FormControl style={{ width: '100%'}}> 
//                 <InputLabel id="demo-simple-select-label">Verification status</InputLabel>
//                 <Controller
//                     control={control}
//                     name="Verification Status"
//                     // onChange={handleChange}
//                     defaultValue=""
//                     render={({onChange, value, onBlur, name}) => (
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         onChange={onChange}
//                         value={value ? value : ''}
//                         name={name}>
//                         <MenuItem value="verified" key="verified">
//                         Verified
//                         </MenuItem>
//                         <MenuItem value="not_verified" key="not_verified">
//                         Not Verified
//                         </MenuItem>
//                         <MenuItem value="pending" key="pending">
//                         Pending
//                         </MenuItem>
//                     </Select>
//                     )}
//                     />
//                 </FormControl> */}
//             </Grid>
            
//             <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 // className={classes.submit}
//                 >
//                 Update
//                 </Button>
            
//             </Grid>
//                 </form>
           
//             </DialogContent>
//           </Dialog>  
            
//         </div>
//     )
// }
