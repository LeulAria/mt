import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Controller } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText, InputLabel } from "@material-ui/core";

export default function FormDialog({
  handleClickOpen,
  handleClose,
  open,
  handleSubmit,
  sendNotifications,
  control,
  errors,
}: any) {
  return (
    <div>
      <form noValidate onSubmit={handleSubmit(sendNotifications)}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Send Notification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your notification message here. Notify users with
              updates occasionally.
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
            <Controller
              name="messageType"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Message Type</InputLabel>
                  <Select
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
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {errors.messageType ? errors.messageType.message : null}
                  </FormHelperText>
                </FormControl>
              )}
              control={control}
              rules={{
                required: "this field is required",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(sendNotifications)}
              color="primary"
              type="submit"
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
