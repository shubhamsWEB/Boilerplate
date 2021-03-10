import { makeStyles } from '@material-ui/core'
import { deepOrange, blue, green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
    color: '#fff',
    backgroundColor: green[500],
  },
  normalBall: {
    backgroundColor: '#e7f7fe',
    color: 'grey',
  },
  avatarPadding: {
    padding: '4px',
    boxShadow: '1px 1px 1px 1px lightgrey',
  },
}))
export default useStyles
