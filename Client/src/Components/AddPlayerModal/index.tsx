import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Input, Button } from '@material-ui/core'
import useStyles from './style'
import Snackbar from '../SnackBar'
type Iprops = {
  snackBar: {
    value: boolean
    message: string
    type: string
  }
  setSnackBar: Function
  handleClose: Function
  handleOpen: Function
  open: boolean
  PlayerName: any
  handleOnSubmit: Function
  teamId: number
}
export default function TransitionsModal({
  snackBar,
  setSnackBar,
  handleClose,
  handleOpen,
  open,
  PlayerName,
  handleOnSubmit,
  teamId,
}: Iprops) {
  const classes = useStyles()

  return (
    <div>
      <List
        component='nav'
        aria-label='main mailbox folders'
        onClick={handleOpen}
      >
        <ListItem button>
          <ListItemText primary='Add New Player' />

          <ListItemSecondaryAction>
            <IconButton edge='end' aria-label='add'>
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Add New Player</h2>

            <Divider />

            <FormControl>
              <InputLabel htmlFor='my-input'>Player Name</InputLabel>

              <Input
                name='playerName'
                id='my-input'
                aria-describedby='my-helper-text'
                required
                inputRef={PlayerName}
              />

              <Button
                variant='contained'
                color='primary'
                className={classes.marginTop}
                onClick={(e) => handleOnSubmit(e, teamId)}
              >
                Add Player
              </Button>
            </FormControl>
          </div>
        </Fade>
      </Modal>
      {snackBar && snackBar.value ? (
        <Snackbar
          isOpen={snackBar.value}
          message={snackBar.message}
          setIsOpen={setSnackBar}
          type={snackBar.type}
        />
      ) : null}
    </div>
  )
}
