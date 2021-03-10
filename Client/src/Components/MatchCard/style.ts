import { makeStyles } from '@material-ui/core'
import { deepOrange, deepPurple } from '@material-ui/core/colors'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
    width: '23rem',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    height: 100,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  vs: {
    color: '#f44336',
  },
  scoring: {
    display: 'flex',
    flexDirection: 'column',
    height: 100,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  toss: {
    backgroundColor: '#CBFFCC',
    '&:hover': {
      backgroundColor: '#ddffde',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  textCenter: {
    textAlign: 'center',
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(3),
  },
  favIconChecked: {
    fontSize: 30,
  },
  favIcon: {
    fontSize: 30,
  },
}))
export default useStyles
