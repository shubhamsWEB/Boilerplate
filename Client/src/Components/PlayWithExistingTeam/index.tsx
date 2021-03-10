import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PlayerList from '../../Containers/Challenge/PlayerList'
import TossModal from '../../Containers/Modals/Toss'
import useLocalStorage from '../../customHooks/useLocalStorage'
import useStyles from './style'
import {textFormValidator,numberValidator} from '../../FormValidators/FormValidator'
import {
  Button,
  CircularProgress,
  Divider,
  Hidden,
  TextField,
  Typography,
} from '@material-ui/core'
import { ErrorSharp } from '@material-ui/icons'

type IstateProps = {
  id: number
  team_name: string
  createdAt: Date
  updatedAt: Date
  ownerid: number
}
export default function Index({
  tossModal,
  setTossModal,
  matchId,
  history,
  teams,
  teamA,
  setTeamA,
  teamB,
  setTeamB,
  handelOnCreateMatch,
  handleSubmit,
  register,
  playerList,
  setPlayerList,
  addToPlayerList,
  errors,
  loading,
  axios
}: any) {
  const classes = useStyles()
  const handleTeamAChange = (event: any) => {
    if (parseInt(event.target.value) !== 0) {
      const selectedTeam = teams.filter(
        (team: any) => team.id === parseInt(event.target.value)
      )
      setTeamA(selectedTeam[0])
    } else {
      setTeamA({ id: 0 })
    }
  }
  const handleTeamBChange = (event: any) => {
    if (parseInt(event.target.value) !== 0) {
      const selectedTeam = teams.filter(
        (team: any) => team.id === parseInt(event.target.value)
      )
      setTeamB(selectedTeam[0])
    } else {
      setTeamB({ id: 0 })
    }
  }
  // const OpenTossModal = () => {
  //   setTossModal(true)
  // }
  const tossTeams = {
    TeamA: teamA.team_name,
    TeamAId: teamA.id,
    TeamBId: teamB.id,
    TeamB: teamB.team_name,
  }
  const user: any = useLocalStorage('user', {})

  return (
    <form className={classes.root} onSubmit={handleSubmit(handelOnCreateMatch)}>
      <Divider />
      <Typography
        className={classes.heading}
        align='center'
        color='primary'
        variant='h4'
        component='h1'
      >
        Challenge Match
      </Typography>
      <Divider />
      <Grid container justify='space-between' spacing={2} xs={12}>
        <Grid item xs={12} md={4} className={classes.wrapper}>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              fullWidth
              id='teamA'
              select
              label='Team A Name'
              name='teamA'
              //value={teamA}
              onChange={handleTeamAChange}
              SelectProps={{
                native: true,
              }}
              variant='outlined'
              color='secondary'
            >
              <option key='dummy' value={0}>
                Select Team A
              </option>
              {teams
                .filter((team: any) => team.ownerId === user[0].userId)
                .map((option: any, index: number) => (
                  <option key={option.id} value={option.id}>
                    {option.team_name}
                  </option>
                ))}
            </TextField>
            <PlayerList
              teamId={teamA.id ? teamA.id : 0}
              playerList={playerList}
              setPlayerList={setPlayerList}
              addToPlayerList={addToPlayerList}
              teamIndex={0}
              axios={axios}
            />
          </Paper>
        </Grid>
        <Hidden only={['xs', 'sm']}>
          {' '}
          <Grid item xs={12} md={4} className={classes.wrapper}>
            <Paper elevation={0} className={classes.paperMiddle}>
              <Grid
                container
                item
                justify='center'
                alignItems='center'
                className={classes.middleFirstItem}
              >
                <TextField
                  variant='outlined'
                  fullWidth
                  name='matchName'
                  type='text'
                  label='Match Name*'
                  autoComplete='off'
                  inputRef={register(textFormValidator())}
                  error={errors.matchName}
                  helperText={errors.matchName?errors.matchName.message:null}
                />
              </Grid>
              <Grid
                container
                item
                justify='center'
                alignItems='center'
                className={classes.teamItem}
              >
                <TextField
                fullWidth
                  variant='outlined'
                  id='datetime-local'
                  type='datetime-local'
                  name='matchTime'
                  label='Time*'
                  inputRef={register(textFormValidator())}
                  //defaultValue='State Time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.matchTime}
                  helperText={errors.matchTime?errors.matchTime.message:null}
                />
              </Grid>
              <Grid
                container
                item
                justify='center'
                alignItems='center'
                className={classes.teamItem}
              >
                <TextField
                  variant='outlined'
                  fullWidth
                  name='matchVenue'
                  type='text'
                  label='Venue*'
                  autoComplete='off'
                  inputRef={register(textFormValidator())}
                  error={errors.matchVenue}
                  helperText={errors.matchVenue?errors.matchVenue.message:null}
                />
              </Grid>
              <Grid
                container
                item
                justify='center'
                alignItems='center'
                className={classes.teamItem}
              >
                <TextField
                  variant='outlined'
                  fullWidth
                  name='overs'
                  type='number'
                  label='overs*'
                  autoComplete='off'
                  inputRef={register(numberValidator())}
                  error={errors.overs}
                  helperText={errors.overs?errors.overs.message:null}
                />
              </Grid>
              <Button
                size='large'
                fullWidth
                variant='contained'
                color='secondary'
                className={classes.teamItem}
                type='submit'
                disabled={loading}
              >
                <CircularProgress
                  color='primary'
                  size='17px'
                  className={classes.loading}
                  style={
                    loading
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                />
                <Typography variant='caption' component='span'>
                  create match
                </Typography>
              </Button>
            </Paper>
            <TossModal
              isOpen={tossModal}
              action={setTossModal}
              matchId={matchId}
              teams={tossTeams}
              history={history}
            />
          </Grid>
        </Hidden>

        <Grid item xs={12} md={4} className={classes.wrapper}>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              fullWidth
              id='teamB'
              select
              name='teamB'
              label='Team B Name'
              onChange={handleTeamBChange}
              SelectProps={{
                native: true,
              }}
              variant='outlined'
              color='secondary'
            >
              <option key='dummy' value={0}>
                Select Team B
              </option>
              {teams.map((option: any, index: number) => (
                <option
                  key={option.id}
                  value={option.id}
                  disabled={option.id === teamA.id}
                >
                  {option.team_name}
                </option>
              ))}
            </TextField>
            <PlayerList
              teamId={teamB.id ? teamB.id : 0}
              playerList={playerList}
              setPlayerList={setPlayerList}
              addToPlayerList={addToPlayerList}
              teamIndex = {1}
              axios={axios}
            />
          </Paper>
        </Grid>
        <Hidden only={['md', 'lg', 'xl']}>
          <Grid item xs={12} md={4} lg={2} className={classes.wrapper}>
            <Paper elevation={0} className={classes.paperMiddle}>
              <Grid container item justify='center' alignItems='center'>
                <TextField
                  variant='outlined'
                  fullWidth
                  name='matchName'
                  type='text'
                  label='Match Name*'
                  autoComplete='off'
                  inputRef={register(textFormValidator())}
                  error={errors.matchName}
                  helperText={errors.matchName?errors.matchName.message:null}
                />
              </Grid>
              <Grid
                container
                item
                justify='center'
                alignItems='center'
                className={classes.teamItem}
              >
                <TextField
                fullWidth
                  variant='outlined'
                  id='datetime-local'
                  type='datetime-local'
                  name='matchTime'
                  label='Time*'
                  inputRef={register(textFormValidator())}
                  //defaultValue='State Time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.matchTime}
                  helperText={errors.matchTime?errors.matchTime.message:null}
                />
              </Grid>
              <Grid
                container
                item
                justify='center'
                alignItems='center'
                className={classes.teamItem}
              >
                <TextField
                  variant='outlined'
                  fullWidth
                  name='matchVenue'
                  type='text'
                  label='Venue*'
                  autoComplete='off'
                  inputRef={register(textFormValidator())}
                  error={errors.matchVenue}
                  helperText={errors.matchVenue?errors.matchVenue.message:null}
                />
              </Grid>
              <Grid
                container
                item
                justify='center'
                alignItems='center'
                className={classes.teamItem}
              >
                <TextField
                  variant='outlined'
                  fullWidth
                  name='overs'
                  type='number'
                  label='overs*'
                  autoComplete='off'
                  inputRef={register(numberValidator())}
                  error={errors.overs}
                  helperText={errors.overs?errors.overs.message:null}
                />
              </Grid>
              <Button
                size='large'
                fullWidth
                variant='contained'
                color='secondary'
                type='submit'
                className={classes.teamItem}
                disabled={loading}
              >
                <CircularProgress
                  color='primary'
                  size='17px'
                  className={classes.loading}
                  style={
                    loading
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                />
                <Typography variant='caption' component='span'>
                  create match
                </Typography>
              </Button>
            </Paper>
          </Grid>
        </Hidden>
      </Grid>
    </form>
  )
}
