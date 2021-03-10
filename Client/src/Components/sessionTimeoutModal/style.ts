import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      transform: 'translateZ(0)',
      '@media all and (-ms-high-contrast: none)': {
        display: 'none',
      },
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "25vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignContent:"center"
      },
      heading: {
        textAlign:"center"
      },
      buttonDiv: {
          display: "flex",
          justifyContent: "space-around",
          alignContent:"Center"
      }
  }));