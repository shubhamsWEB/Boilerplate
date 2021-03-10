import React from 'react'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@material-ui/core'
import Loader from '../Loader'
import useStyles from '../../Containers/Modals/Batsman/style'

type Iprops = {
  isOpen: boolean
  teamsData: Array<{
    teamId: number
    teamName: string
    players: Array<{
      outSummary: string
      playerId: number
      playerName: string
    }>
  }>
  liveData: {
    batting: Array<{
      balls_faced: number
      extras: number
      fours: number
      overs_bowled: number
      playerId: number
      player_name: string
      runs: number
      runs_given: number
      sixs: number
      wickets: number
    }>
    battingTeam: number
    battingTeamName: string
    bowlerId: number
    bowling: Array<{
      balls_faced: number
      extras: number
      fours: number
      overs_bowled: number
      playerId: number
      player_name: string
      runs: number
      runs_given: number
      sixs: number
      wickets: number
    }>
    bowlingTeam: number
    bowlingTeamName: string
    currentInnings: number
    inningOneScore: number
    isCompleted: number
    nonStrickerId: number
    overs: number
    score: number
    strickerId: number
    wickets: number
  }
  handleClose: Function
  handleToggle: Function
  handleSubmit: Function
  checked: number
}

export default function TransitionsModal({
  isOpen,
  liveData,
  handleToggle,
  checked,
  handleSubmit,
  handleClose,
  teamsData,
}: Iprops) {
  const classes = useStyles()

  if (teamsData && liveData && liveData.batting ) {
    return (
      <div>
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={isOpen}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isOpen}>
            <div className={classes.paper}>
              <h2 id='transition-modal-title'>Select Out Batsman</h2>
              <Divider />
              <div style={{ width: '100%' }}>
                <List component='nav' aria-label='main mailbox folders'>
                  {liveData.batting.map(
                    (player: {
                      balls_faced: number
                      extras: number
                      fours: number
                      overs_bowled: number
                      playerId: number
                      player_name: string
                      runs: number
                      runs_given: number
                      sixs: number
                      wickets: number
                    }) => {
                      return (
                        <ListItem
                          key={player.playerId}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(player.playerId)}
                        >
                          <ListItemText
                            id={`player-${player.playerId}`}
                            primary={player.player_name}
                          />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge='start'
                              checked={checked === player.playerId}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{
                                'aria-labelledby': `player-${player.playerId}`,
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    }
                  )}
                </List>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.marginTop}
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.marginTop}
                  onClick={() => handleClose()}
                >
                  Close
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  } else {
    return <Loader />
  }
}
