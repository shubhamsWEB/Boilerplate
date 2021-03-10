import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(4, 0, 0),
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  },
  heading: {
    color: '#000000',
    fontWeight: 500,
    display: 'flex',
    alignSelf: 'flex-start',
  },
  avatar: {
    padding: 25,
    backgroundColor: "#3f50b5"
  },
  input: {
    marginTop: theme.spacing(2),
    color: '#4267B2',
    outline: 'none'
  },
  loading: {
    marginRight: theme.spacing(2),
  }
}), { index: 1 })
export default useStyles
