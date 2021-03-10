import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // backgroundColor: '#f8f8ff',
    },
    paper: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // backgroundColor: '#f8f8ff',
    },
    paperMiddle: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // backgroundColor: '#f8f8ff',
    },
    middleFirstItem: {
      marginTop: theme.spacing(10),
    },
    teamItem: {
      marginTop: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
      alignContent:"center"
    },
    control: {
      padding: theme.spacing(2),
    },
    wrapper: {
      marginTop: theme.spacing(3),
    },
    heading: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    loading: {
      marginRight: theme.spacing(2),
    },
}))
export default useStyles