import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'
import getName from '../../utils/createAvatar'
import AddPlayer from '../../Containers/Modals/AddPlayer'
import { Typography } from '@material-ui/core'
import useStyles from './style'
 function PlayerList({
  players,
  addToPlayerList,
  playersList,
  teamId,
   setPlayers,
  teamIndex,
  axios
 }: any) {
   const classes = useStyles()
  return (
    <div style={{ width: '100%' }}>
      <List component='nav' aria-label='main mailbox folders'>
        <AddPlayer teamId={teamId} setPlayers={setPlayers} axios={axios} />
        {players.map((player: any) => (
          <ListItem
            key={player.id}
            role={undefined}
            dense
            button
            onClick={() => addToPlayerList(player)}
          >
            <ListItemAvatar>
              <Avatar className={teamIndex===0?classes.avatar1:classes.avatar2}><Typography variant="subtitle2" component="span">{getName(player.player_name)}</Typography></Avatar>
            </ListItemAvatar>
            <ListItemText
              id={`player-${player.id}`}
              primary={player.player_name}
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge='start'
                checked={
                  playersList.findIndex(function (obj: any) {
                    return obj.id === player.id
                  }) !== -1
                }
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': `player-${player.playerId}`,
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
export default PlayerList;