import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
      },
      paper: {
        width: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
      },
      avatar1: {
        padding: theme.spacing(0.8),
        backgroundColor:"#FF5721"
      },
      avatar2: {
        padding: theme.spacing(0.8),
        backgroundColor:"#673AB6"
      },
      heading1: {
        color: "#FF5721",
        textTransform: "capitalize",
        margin: theme.spacing(1),
        textAlign:"center"
      },
      heading2: {
        color: "#673AB6",
        textTransform: "capitalize",
        margin: theme.spacing(1),
        textAlign:"center"
        
      },
      playerName: {
        margin:theme.spacing(1)
      },
      wrapper: {
        padding:15
      }
    
  }))
  export default useStyles;