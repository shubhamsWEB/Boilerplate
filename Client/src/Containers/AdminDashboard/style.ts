import { makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
      },
      root: {
        flexGrow: 1,
        height: '100vh',
      },
      mid: {
        flexGrow: 1,
        height: 'auto',
      },
      grids: {
        border: '1px solid black',
      },
      gridsTopLeft: {
        padding: theme.spacing(2),
      },
      gridWrapperTop: {
        marginTop: theme.spacing(1),
        maxHeight: 200,
        marginBottom: theme.spacing(1),
      },
      gridWrapperMiddle: {
        maxHeight: 300,
        marginBottom: theme.spacing(2),
      },
      gridWrapperBottom: {
        maxHeight: 400,
      },
      buttonText: {
        textTransform: 'capitalize',
      },
      midRight: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
      },
      gridsMiddleRight: {
        padding: theme.spacing(0.4),
        border: '1px solid gray',
      },
      bottomRightTop: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 50,
        padding: theme.spacing(1),
      },
      bottomRightMid: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      gridsBottomRight: {
        padding: theme.spacing(0.3),
        borderRadius: 35,
        marginBottom: theme.spacing(0.5),
      },
      heading: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
      marginTop: {
        margin: '5px',
      },
      loading: {
        fontSize: "2px",
        color: "black",
        marginRight:"3px"
  }
}))
export default useStyles;