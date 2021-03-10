import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Loader from '../Loader'
import useStyles from '../../Containers/AdminDashboard/LiveScore/style'
import { getRunRate } from '../../utils/getRunRate'

type Iprops = {
  liveInfo: {
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
  maxOvers: number
}

function Index({ liveInfo, maxOvers }: Iprops) {
  const classes = useStyles()
  const reanderBatsman = () => {
    if (liveInfo.batting) {
      return liveInfo.batting.map(
        (
          player: {
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
          },
          key: number
        ) => {
          return (
            <Grid
              item
              container
              xs={12}
              className={classes.tBody}
              key={player.playerId}
            >
              <Grid item xs={4}>
                <Typography align='center' component='span' variant='subtitle2'>
                  {player.player_name}{' '}
                  {liveInfo.strickerId === player.playerId ? '🏏' : ''}
                </Typography>
              </Grid>

              <Grid item xs={8} className={classes.playerBoard}>
                {[
                  player.runs,
                  player.balls_faced,
                  player.fours,
                  player.sixs,
                ].map((field) => {
                  return (
                    <Typography
                      align='center'
                      component='span'
                      variant='caption'
                    >
                      {field}
                    </Typography>
                  )
                })}

                <Typography align='center' component='span' variant='caption'>
                  {player.balls_faced === 0
                    ? '0.00'
                    : ((player.runs / player.balls_faced) * 100).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          )
        }
      )
    } else {
      return <Loader />
    }
  }

  const reanderBowler = () => {
    if (liveInfo.bowling) {
      return liveInfo.bowling.map(
        (
          player: {
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
          },
          key: number
        ) => {
          return (
            <Grid key={key} item container xs={12} className={classes.tBody}>
              <Grid item xs={4}>
                <Typography align='center' component='span' variant='subtitle2'>
                  {player.player_name}
                </Typography>
              </Grid>

              <Grid item xs={8} className={classes.playerBoard}>
                {[
                  player.overs_bowled,
                  player.runs_given,
                  player.wickets,
                  player.extras,
                ].map((field) => {
                  return (
                    <Typography
                      align='center'
                      component='span'
                      variant='caption'
                    >
                      {field}
                    </Typography>
                  )
                })}

                <Typography align='center' component='span' variant='caption'>
                  {player.runs_given && player.overs_bowled !== 0
                    ? getRunRate(player.runs_given, player.overs_bowled)
                    : '0.00'}
                </Typography>
              </Grid>
            </Grid>
          )
        }
      )
    } else {
      return <Loader />
    }
  }
  if (liveInfo) {
    return (
      <>
        <Grid item xs={12} sm={5} className={classes.gridsMiddleLeft}>
          <Grid item container xs={12} className={classes.tHead}>
            <Grid item xs={4}>
              <Typography align='center' component='span' variant='subtitle1'>
                Batting
              </Typography>
            </Grid>

            <Grid item xs={8} className={classes.playerBoard}>
              {['R', 'B', "4's", "6's", 'S/R'].map((field) => {
                return (
                  <Typography
                    align='center'
                    component='span'
                    variant='subtitle2'
                  >
                    {field}
                  </Typography>
                )
              })}
            </Grid>
          </Grid>
          {reanderBatsman()}

          <Grid item container xs={12} className={classes.tHead}>
            <Grid item xs={4}>
              <Typography align='center' component='span' variant='subtitle1'>
                Bowling
              </Typography>
            </Grid>

            <Grid item xs={8} className={classes.playerBoard}>
              {['O', 'R', 'W', 'Extra', 'Eco'].map((field) => {
                return (
                  <Typography
                    align='center'
                    component='span'
                    variant='subtitle2'
                  >
                    {field}
                  </Typography>
                )
              })}
            </Grid>
          </Grid>
          {reanderBowler()}
        </Grid>

        <Grid item xs={12} sm={3} className={classes.gridsMiddleMid}>
          <Grid item container xs={12} className={classes.inningsTitle}>
            <Typography component='p' variant='subtitle1'>
              {liveInfo.currentInnings === 1
                ? '1st Innings'
                : `2nd Innings Target (${liveInfo.inningOneScore + 1} runs)`}
            </Typography>
          </Grid>

          <Grid
            item
            container
            xs={12}
            justify='space-around'
            alignItems='center'
            className={classes.inningsBoard}
          >
            <Grid xs={4} className={classes.innings}>
              <Typography color='primary' component='p' variant='subtitle1'>
                Score
              </Typography>

              <Grid>
                <Typography component='p' variant='subtitle1'>
                  {liveInfo.score}/{liveInfo.wickets}
                </Typography>
              </Grid>
            </Grid>

            <Grid xs={4} className={classes.innings}>
              <Typography color='primary' component='p' variant='subtitle1'>
                CRR
              </Typography>

              <Grid>
                <Typography component='p' variant='subtitle1'>
                  {liveInfo.score && liveInfo.overs
                    ? getRunRate(liveInfo.score, liveInfo.overs)
                    : '0.00'}
                </Typography>
              </Grid>
            </Grid>

            <Grid xs={4} className={classes.innings}>
              <Typography color='primary' component='p' variant='subtitle1'>
                Overs
              </Typography>

              <Grid>
                <Typography component='p' variant='subtitle1'>
                  {liveInfo.overs}/{maxOvers}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  } else {
    return <Loader />
  }
}

export default Index
