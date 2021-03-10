import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow:'scroll',
      marginTop: 'auto'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
      width: '500px',
    },
    marginTop: {
      margin: theme.spacing(1),
    },
    players: {
      width: '100%',
      margin: theme.spacing(1),
    },
  }))
export default useStyles;   