import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: '100%',
    },
    TableHeading: {
      fontSize: '12px',
      color: '#fff',
    },
    TotalScoreRow: {
      background: '#061D42',
      color: '#fff',
    },
    ExtrasRow: {
      backgroundColor: '#061D42',
    },
    textWhite: {
      color: '#fff',
    },
    padding15: {
      padding: '5px',
    },
    paper: {
      width: '100%',
      background: '#D3302F',
      color: '#fff',
    },
    marginTop: {
      marginTop: '15px',
    },
  }))
  export default useStyles;