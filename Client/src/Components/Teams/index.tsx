import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Loader from '../Loader'
import getAvatar from '../../utils/createAvatar'
import useStyles from '../../Containers/SingleMatch/Teams/style'
import Divider from '@material-ui/core/Divider'

type Iprops = {
  teamsData: Array<{
    teamId: number
    teamName: string
    players: Array<{
      outSummary: string
      playerId: number
      playerName: string
    }>
  }>
}

export default function SelectedListItem({ teamsData }: Iprops) {
  const classes = useStyles()
  if (teamsData) {
    return (
      <div className={classes.root}>
        <Grid container>
          {teamsData.map(
            (
              teamData: {
                teamId: number
                teamName: string
                players: Array<{
                  outSummary: string
                  playerId: number
                  playerName: string
                }>
              },
              index: number
            ) => (
              <Grid item key={teamData.teamId} xs={12} sm={6}>
                <Paper elevation={0} className={classes.wrapper}>
                  <Typography
                    className={index === 0 ? classes.heading1 : classes.heading2}
                    variant='h4'
                  >
                    {teamData.teamName}
                  </Typography>
                  <Divider />
                  <List component='nav'>
                    {teamData.players.map(
                      (player: {
                        outSummary: string
                        playerId: number
                        playerName: string
                      }) => (
                        <>
                          <ListItem key={player.playerId} button>
                            <ListItemIcon>
                              <Avatar
                                className={
                                  index === 0
                                    ? classes.avatar1
                                    : classes.avatar2
                                }
                              >
                                {getAvatar(player.playerName)}
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              className={classes.playerName}
                              primary={player.playerName}
                            />
                          </ListItem>
                          <Divider />
                        </>
                      )
                    )}
                  </List>
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      </div>
    )
  } else {
    return <Loader />
  }
}
