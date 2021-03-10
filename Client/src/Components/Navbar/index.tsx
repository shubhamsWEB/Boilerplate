import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Hidden } from '@material-ui/core'
import useStyles from './style'
import { Link } from 'react-router-dom'
import SideBar from '../Sidebar'
// import { userLogout } from '../../api/actions'
import {NavbarDetails} from '../../Constants/navbarDetailes';
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';
type Iprops = {
  setLoggedinUser:(data:{userId:string,userName:string,expiredDate:Date}|{})=>void,
  setLoginAuthenticated:(data:boolean)=>void,
  setSnackBar:(data: { value: boolean; message: string; type: string }) => void,
  authFinder:boolean
}

export default function Navbar({
  setLoggedinUser,
  setLoginAuthenticated,
  setSnackBar,
  authFinder
}: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {userLogout} = apiCalls(axios);
  const classes = useStyles()
  const navbarDetails = NavbarDetails(authFinder);
  async function handleUserLogoutclick(){
    await userLogout()

    setLoggedinUser({})
    setLoginAuthenticated(false)
    setSnackBar({value: true,message:'Logged Out Successfully',type: 'green'});
  }
  return (
   
    <div className={classes.root}>
    
      <AppBar className={classes.navbar} position='fixed'>
      
        <Toolbar>
        
          <Typography variant='h5'  className={classes.title}>
            CrickBoard
          </Typography>
        
          <Hidden only={['sm', 'xs']}>
            {navbarDetails.map((detail,key) => {
              if (!detail.isButton) {
               
                return <Link
                  key={key}
                  to={detail.to}
                  className={detail.isLastLink ? classes.lastLink : classes.link}
                >
                
                  <Typography variant='subtitle1' color='inherit'>
                    {detail.name}
                  </Typography>
                </Link>
              }
              else {
               
                return <Link
                  key={key}
                  to={detail.to}
                  className={detail.isLastLink ? classes.signupLink:classes.link}
                  style={
                    detail.authFinder ? { display: 'none' } : { display: 'block' }
                  }
                >
               
                  <Button
                    color={detail.to==='/'?'secondary':'primary'}
                    className={classes.margin}
                    variant='contained'
                    {...(detail.to==='/' && {onClick:handleUserLogoutclick})}
                  >
                    {detail.name}
                  </Button>
                </Link>
              }
            })}
            </Hidden>
        
          <Hidden  only={['lg', 'xl']}>
          
            <SideBar authFinder={authFinder} logout={handleUserLogoutclick} />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}
