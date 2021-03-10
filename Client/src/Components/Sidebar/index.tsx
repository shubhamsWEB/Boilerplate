import React from 'react'
import clsx from 'clsx'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MenuIcon from '@material-ui/icons/Menu'
import { Hidden, IconButton} from '@material-ui/core'
import useStyles from './style'
import SuccessButton from '../CustomButtons/success'
import { Link } from 'react-router-dom'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { purple,deepOrange,lightBlue,green} from '@material-ui/core/colors';

type Iprops = {
  authFinder:boolean,
  logout:()=>Promise<void>
}

export default function SideBar({
  authFinder,
  logout
}: Iprops) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    right: false
  })
  const toggleDrawer = (anchor: string, open: boolean) => (event:any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const list = (anchor: string) => <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom'
    })}
    role='presentation'
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
        {[{ name: 'Live Matches', to: '/', icon: <LiveTvIcon className={ classes.icon}/>}, { name: ' My Subscriptions', to: '/subscriptions',icon:<SubscriptionsIcon className={ classes.icon}/> }, { name: 'Tournaments', to: '/',icon:<ListAltIcon className={ classes.icon}/> }, { name: 'Cric Feed',to:'/',icon:<InboxIcon className={ classes.icon} />}].map((text, index) => (
              <Link key={index} to={text.to} style={{textDecoration:"none",color:"black"}}>
            <ListItem className={classes.linkText} button key={text.name}>
                    <ListItemIcon>{ text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
        </ListItem>
        </Link>
      ))}
    </List>
    <Divider />
    <List>
      {[{ name: 'Quick Match',color:purple[500],hoverColor:purple[700], to: '/quickmatch',hide:!authFinder},{ name: 'Challenge Match',color:purple[500],hoverColor:purple[700], to: '/challengematch',hide:!authFinder},{name:'Signup',color:green['A400'],hoverColor:green['A200'],to:'/signup',hide:authFinder},{name:'Login',color:lightBlue['A700'],hoverColor:lightBlue['A400'],to:'/login',hide:authFinder},{ name: 'Logout' ,color:deepOrange[500],hoverColor:deepOrange[700],hide:!authFinder}].map((text,index) => (
        text.name !== 'Logout' ?
                  <Link key={index} to={text.to} style={text.hide? {display:"none"}:{display:"block",textDecoration:"none",color:"white"}}>
            <ListItem key={text.name} className={classes.buttonList}>
                <SuccessButton color={text.color} hoverColor={text.hoverColor} text={text.name}/>
            </ListItem>
            </Link>
          :
                  <ListItem key={text.name} className={classes.buttonList} style={text.hide? {display:"none"}:{display:"block",color:"white"}}>
                    <SuccessButton color={text.color} hoverColor={text.hoverColor} text={text.name} onClick={logout} />
        </ListItem>
      ))}
    </List>
  </div>

  return (
      <>
        <Hidden only={['lg', 'xl', 'md']}><Button onClick={toggleDrawer('right', true)} className={classes.menuButton}>
            <IconButton
          edge='start'

          color='inherit'
          aria-label='menu'
        >
                <MenuIcon />
        </IconButton>
      </Button>
      </Hidden>
        <SwipeableDrawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </>
  )
}
