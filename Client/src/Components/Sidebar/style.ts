import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    fontFamily: 'Montserrat',
  },
  list: {
    width: 250,
    backgroundColor: "#183B5A",
    height:"100%"
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginLeft: 'auto',
    color: '#fff',
    marginRight: theme.spacing(-2)
  },
  buttonList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color:"#FEFCD7"
  },
  linkText: {
    color:"#FEFCD7"
  }
}))
export default useStyles
