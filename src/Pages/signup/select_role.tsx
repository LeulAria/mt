import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // margin: theme.spacing(1),
      // minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function SimpleSelect(user: any) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        {/* <InputLabel>Solutions</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...user}
          name="solutions"
          required
          variant="outlined"
          placeholder="Services"
        >
          <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          <MenuItem value={"TECH SUPPORT"}>TECH SUPPORT</MenuItem>
          <MenuItem value={"SALES SUPPORT"}>SALES SUPPORT</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
