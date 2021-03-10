import React from 'react'
import Modal from '@material-ui/core/Modal'
import { Button, Fade, Grid, Typography } from '@material-ui/core'
// import { userLogout } from '../../api/actions'
import { apiCalls } from 'crickboardapi'
import AxiosContext from '../../context/axios'
import { useStyles } from './style'
export default function ServerModal({
  isOpen,
  setTimer,
  setLoggedinUser,
  setLoginAuthenticated,
  setSnackBar,
}) {
  let axios = React.useContext(AxiosContext);

  const { userLogout } = apiCalls(axios)

  const [warningTimer, setWarningTimer] = React.useState('02:00')
  React.useEffect(() => {
    let mounted = true
    function startTimer(duration) {
      var timer = duration,
        minutes,
        seconds
      setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        setWarningTimer(minutes + ':' + seconds)

        if (--timer < 0) {
          setWarningTimer('00:00')
        }
      }, 1000)
    }
    if (mounted) {
      startTimer(120)
    }
    return () => {
      mounted = false
    }
  }, [])

  const classes = useStyles()
  const handleClose = () => {
    setTimer(false)
  }
  const handleLogout = async (userLoggingOut = true) => {
    await userLogout()
    setTimer(false)
    setLoggedinUser({})
    setLoginAuthenticated(false)
    setSnackBar({
      value: true,
      message: userLoggingOut
        ? 'Logged Out Successfully.'
        : 'Logged out for being idle.',
      type: userLoggingOut ? 'green' : 'red',
    })
  }
  if (warningTimer === '00:00') {
    handleLogout(false)
  }
  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      open={isOpen}
      aria-labelledby='server-modal-title'
      aria-describedby='server-modal-description'
      className={classes.modal}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <Typography
            className={classes.heading}
            color='secondary'
            variant='h6'
            id='server-modal-title'
          >
            <b>You will be loggedout in ({warningTimer})</b>
          </Typography>
          <Typography
            className={classes.heading}
            color='primary'
            component='p'
            variant='subtitle2'
            id='server-modal-description'
          >
            You have been idle for too long
          </Typography>

          <div className={classes.buttonDiv}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.marginTop}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.marginTop}
              onClick={() => handleClose()}
            >
              Edit match
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}
