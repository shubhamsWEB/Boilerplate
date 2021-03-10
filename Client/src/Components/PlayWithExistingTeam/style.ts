import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '15px'
    },
    paperMiddle: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    middleFirstItem: {
      marginTop: theme.spacing(10),
    },
    teamItem: {
      marginTop: theme.spacing(3),
    },
    control: {
      padding: theme.spacing(2),
    },
    wrapper: {
      marginTop: theme.spacing(3),
    },
    heading: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    MuiTextField: {
      margin: theme.spacing(1),
      width: '25ch',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
  },
    loading: {
      marginRight: theme.spacing(2),
    },
  }))
  export default useStyles;