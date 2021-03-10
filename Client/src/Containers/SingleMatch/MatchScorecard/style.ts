import {makeStyles} from '@material-ui/core';
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
        minWidth: 650,
      },
      TableHeading: {
        fontSize: '12px',
        color: '#fff',
      },
      TotalScoreRow: {
        background: '#04695B',
        color: '#fff',
      },
      ExtrasRow: {
        background: 'lightgray',
      },
      textWhite: {
        color: '#fff',
        background: '#dd2c00'
      },
  marginTop: {
    marginTop: theme.spacing(2),
    overflow:"scroll"
  },
  fallOfWickets: {
    listStyleType: 'none',
    margin: 0,
    padding: "0px 0px 15px 0px",
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop:theme.spacing(0.5)
  },
  listItemTop: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop:0
  },
  fallOfWicketsHeading: {
   textAlign:"center"
  },
  topDivider: {
    backgroundColor: "#000000",
    height:1
  },
  tableHeader: {
    background: "#061D42",
  }
}))
export default useStyles;
