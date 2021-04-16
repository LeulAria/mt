
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(5),
      // minWidth: "100vh",
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    table: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '93%',
        paddingTop: '2%',
        maxHeight: window.innerHeight-120
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    divider: {
        width: '50%',
        backgroundColor: '#F74857',
        alignItems: 'center',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        justifyContent: 'center'
      },
      title: {
          fontWeight: 1000,
          color: '#333',
          opacity: '0.8'
      }
  }));