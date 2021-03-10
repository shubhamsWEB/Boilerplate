import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    tHead: {
      backgroundColor: '#1B398A',
      color: '#fff',
      paddingLeft: theme.spacing(1),
    },
    playerBoard: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    marginLeft: {
      marginLeft: theme.spacing(0),
    },
    tBody: {
      paddingLeft: theme.spacing(0.3),
    },
    gridsMiddleLeft: {
      border: '1px solid gray',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    gridsMiddleMid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    inningsTitle: {
      backgroundColor: '#1B398A',
      color: '#fff',
      maxHeight: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inningsBoard: {
      borderTop: '1px solid gray',
      borderBottom: '1px solid gray'
    },
    innings: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }))
  export default useStyles;