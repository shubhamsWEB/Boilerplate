import React from 'react'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import { Button, Typography } from '@material-ui/core'
import Loader from '../Loader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Snackbar from '../SnackBar'
import useStyles from '../../Containers/Modals/Opening/style'

type Iprops = {
    isOpen:boolean,
    data:{
      battingTeam: number
      bowlingTeam: number
    },
    teamsData:Array<{
      teamId: number
      teamName: string
      players: Array<{
        outSummary: string
        playerId: number
        playerName: string
      }>
    }>,
    handleToggle:(value: number) => void,
    handleSubmit:() => Promise<void>,
    handleClose:() => void,
    checkedBowler:number,
    checkedBatsman:Array<number>,
    snackBar:{
      value: boolean;
      message: string;
      type: string;
  },
    setSnackBar:(data:{
      value: boolean;
      message: string;
      type: string;
  })=>void,
    handleBatsmanChange:(value: number) => void
  
}

type Iparams = {
  team:{
    teamId: number
    teamName: string
    players: Array<{
      outSummary: string
      playerId: number
      playerName: string
    }>
  },
  player:{
    outSummary: string
    playerId: number
    playerName: string
  }
}

export default function TransitionsModal({
  isOpen,
  data,
  teamsData,
  handleToggle,
  handleSubmit,
  handleClose,
  checkedBowler,
  checkedBatsman,
  snackBar,
  setSnackBar,
  handleBatsmanChange
}: Iprops) {
  const classes = useStyles()
  if (teamsData) {
  
    return <>
     
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={isOpen}
        hideBackdrop={false}
        BackdropProps={{
          timeout: 500,
        }}
      >
       
        <Fade in={isOpen}>
         
          <div className={classes.paper}>
           
            <h2 id='transition-modal-title'>
              Select Opening Batsman and Bowler
            </h2>
           
            <Divider />
           
            <Grid container spacing={3}>
             
              <Grid item xs={12} sm={6}>
               
                <Paper elevation={2}>
                 
                  <div className={classes.players}>
                   
                    <Typography
                      variant='h6'
                      component='p'
                      color='primary'
                      align='center'
                    >
                      Select Batsman
                    </Typography>
                   
                    <List component='nav' aria-label='main mailbox folders'>
                      {teamsData.map((team: Iparams["team"]) => {
                        if (team.teamId === data.battingTeam) {
                          return team.players.map((player: Iparams["player"]) => {
                            return (
                            
                              <ListItem
                                key={player.playerId}
                                role={undefined}
                                dense
                                button
                                onClick={() =>
                                  handleBatsmanChange(player.playerId)
                                }
                              >
                               
                                <ListItemText
                                  id={`player-${player.playerId}`}
                                  primary={player.playerName}
                                />
                               
                                <ListItemSecondaryAction>
                                 
                                  <Checkbox
                                    edge='start'
                                    checked={
                                      checkedBatsman.indexOf(
                                        player.playerId
                                      ) !== -1
                                    }
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                      'aria-labelledby': `player-${player.playerId}`,
                                    }}
                                  />
                                </ListItemSecondaryAction>
                              </ListItem>
                            )
                          });
                        }
                      })}
                    </List>
                  </div>
                </Paper>
              </Grid>
             
              <Grid item xs={12} sm={6}>
               
                <Paper elevation={2}>
                 
                  <div className={classes.players}>
                   
                    <Typography
                      variant='h6'
                      component='p'
                      color='primary'
                      align='center'
                    >
                      Select Bowler
                    </Typography>
                   
                    <List component='nav' aria-label='main mailbox folders'>
                      {teamsData.map((team: Iparams["team"]) => {
                        if (team.teamId === data.bowlingTeam) {
                          return team.players.map((player: Iparams["player"]) => {
                            return (
                            
                              <ListItem
                                key={player.playerId}
                                role={undefined}
                                dense
                                button
                                onClick={() =>handleToggle(player.playerId)}
                              >
                               
                                <ListItemText
                                  id={`player-${player.playerId}`}
                                  primary={player.playerName}
                                />
                               
                                <ListItemSecondaryAction>
                                 
                                  <Checkbox
                                    edge='start'
                                    checked={
                                      checkedBowler === player.playerId
                                    }
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                      'aria-labelledby': `player-${player.playerId}`,
                                    }}
                                  />
                                </ListItemSecondaryAction>
                              </ListItem>
                            )
                          });
                        }
                      })}
                    </List>
                  </div>
                </Paper>
              </Grid>
            </Grid>
           
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
        </Fade>
      </Modal>
     
      <Snackbar
        isOpen={snackBar.value}
        message={snackBar.message}
        setIsOpen={setSnackBar}
        type={snackBar.type}
      />
    </>;
  } else {
  
    return <Loader />
  }
}
