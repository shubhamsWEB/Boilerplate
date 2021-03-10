import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
    },
    paper: {
        padding:theme.spacing(0.5),
        backgroundColor:"#f8f8ff",
        marginTop:theme.spacing(6),
        height: "300px",
        minWidth: "60vw",
        maxWidth:"100vw",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:"center"
    },
    button: {
        marginTop:theme.spacing(2)
    },
    heading: {
        color: "#1DB954",
        
    },
    buttonHolder: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width:"100%"
    }
}))
export default useStyles
