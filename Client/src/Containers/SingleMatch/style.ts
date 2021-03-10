import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
        height: 'auto',
      },
      wrapper: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0),
        display: 'flex',
        justifyContent: 'space-around',
      },
  }))
  export default useStyles;