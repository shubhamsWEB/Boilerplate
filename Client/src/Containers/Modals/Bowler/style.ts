import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
      width: '300px',
    },
    marginTop: {
      margin: theme.spacing(1),
    },
  }))
  export default useStyles;