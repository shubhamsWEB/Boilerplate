import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
let theme = createMuiTheme({
  palette: {
   // type:'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },

    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  }
})
theme = responsiveFontSizes(theme)
export default theme
