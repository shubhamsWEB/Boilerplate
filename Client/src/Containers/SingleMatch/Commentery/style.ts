import {makeStyles} from '@material-ui/core';
import { deepOrange, blue,green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    padding15: {
      padding: '15px',
    },
    paper: {
      padding: theme.spacing(2),
      background: '#D3302F',
      color: '#fff',
    },
    paperBlue: {
      background:'#19398A',
      padding: theme.spacing(2),
      color: '#fff'
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    blue: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
    },
    green: {
      color: "#fff",
      backgroundColor: green[500],
    },
    avatarPadding: {
      padding: "4px",
      boxShadow:"1px 1px 1px 1px lightgrey"
  },
  normalBall: {
    backgroundColor: "#e7f7fe",
    color:"grey"
    }

  }))
  export default useStyles;