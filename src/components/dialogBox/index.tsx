import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Controller } from "react-hook-form";

export default function FormDialog({
    handleClickOpen,
    handleClose,
    open,
    handleSubmit,
    sendNotifications,
    control,
    errors
}: any) {
    return (
        <div>
            <form noValidate onSubmit={handleSubmit(sendNotifications)}>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Send Notification</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your notification message here. Notify users with updates
                            occasionally.
                    </DialogContentText>
                        <Controller
                            name="notificationMessage"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    autoFocus
                                    {...field}
                                    margin="dense"
                                    label="Message"
                                    type="text"
                                    fullWidth
                                    error={errors.notificationMessage}
                                    required
                                    helperText={errors.notificationMessage ? errors.notificationMessage.message : null}
                                />
                            )}

                            rules={
                                {
                                    required: 'this field is required'
                                }
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button 
                        onClick={handleSubmit(sendNotifications)}
                        color="primary" type="submit">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}
