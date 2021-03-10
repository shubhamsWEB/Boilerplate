import { makeStyles } from '@material-ui/core';
import { deepOrange, blue,green } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    gridsTopRight: {
      // border: "1px solid black",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    gridsTopRightTitle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridsTopRightBottom: {
      //border: "1px solid black",
      padding: theme.spacing(0.4),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "flex-end",
      alignItems: 'center',

    },
    ballScoreWrapper: {
      // border: "1px solid black",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: "1.07vw"
     
    },
    ballScore: {
      padding: theme.spacing(0.5),
      width: "1.4rem",
      height: "1.4rem",
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
  normalBall: {
    backgroundColor: "#83c3f7", 
    }
  }))
  export default useStyles;