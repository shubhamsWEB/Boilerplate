import { makeStyles } from '@material-ui/core'
import { deepOrange, deepPurple } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      paper: {
        width: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      wrapper: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center"
      },
      vanueHeading: {
        margin: 0,
        padding: '10px',
        color: '#000',
      },
      large: {
        width: "7rem",
        height: "7rem",
          },
      bold: {
        fontWeight: 'bold',
      },
      textBlack: {
        color: '#000',
  },
  vs: {
    color: '#f44336',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  avatarWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center"
  },
  marginLeft: {
    paddingLeft:"7.2vw"
  },
  marginRight: {
    paddingRight:"7.2vw"
  },
  newLarge: {
      width: theme.spacing(22),
      height: theme.spacing(22),
      margin: 'auto',
  },
  link: {
    textDecoration: "none",
    color: "#f8f8ff",
    width:128
  }
  }))
  export default useStyles;