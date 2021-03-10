import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    fontFamily: 'Montserrat',
    marginBottom: theme.spacing(9.5),
    },
  title: {
    // flexGrow: 1,
    color: '#fff',
    fontWeight: 'bolder',
    fontFamily: 'Montserrat',
    marginRight: theme.spacing(4)
  },
  link: {
    marginLeft: theme.spacing(2),
    fontFamily: 'Montserrat',
    textDecoration: "none",
    color: 'white',
  },
  lastLink: {
    margin: "auto",
    textDecoration: "none",
    color: 'white',
  },
  signupLink: {
    marginLeft: "auto",
    textDecoration: "none",
    color: 'white',
  },
  margin: {
    margin: theme.spacing(1),
    textTransform: 'capitalize'
  },
  navbar: {
    backgroundColor: '#00695C'
  }
}))
export default useStyles
