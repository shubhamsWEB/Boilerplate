import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Loader from '../Loader'
import useStyles from '../../Containers/SingleMatch/LiveScoreCard/styles'
import { getRunRate } from '../../utils/getRunRate'

type Iprops = {
  matchId: number
  data: {
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
}

type Iparams = {
  battingObject: {
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
  }
}

export default function BasicTable({ matchId, data }: Iprops) {
  const classes = useStyles()
  if (data) {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            {/* // ! BATSMAN DETAILS OF 1ST INNINGS */}

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow className={classes.ExtrasRow}>
                    {['Batting', 'Runs', 'Balls', '4s', '6s', 'SR'].map(
                      (field) => {
                        return (
                          <TableCell className={classes.TableHeading}>
                            {field}
                          </TableCell>
                        )
                      }
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.batting.map((row: Iparams['battingObject']) => (
                    <TableRow key={row.player_name}>
                      {[
                        [
                          row.player_name,
                          data.strickerId === row.playerId ? '*' : '',
                        ],
                        row.runs,
                        row.balls_faced,
                        row.fours,
                        row.sixs,
                        row.runs && row.balls_faced
                          ? ((row.runs / row.balls_faced) * 100).toFixed(2)
                          : '0.00',
                      ].map((field: any, index: number) => {
                        return index === 0 ? (
                          <TableCell>
                            {field[0]} {field[1]}
                          </TableCell>
                        ) : (
                          <TableCell>{field}</TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                  {/* // ! BOWLER DETAILS OF 1ST INNINGS */}

                  <TableRow className={classes.ExtrasRow}>
                    {[
                      'Bowling',
                      'Overs',
                      'Runs',
                      'Wickets',
                      'Extras',
                      'Eco',
                    ].map((field) => {
                      return (
                        <TableCell className={classes.TableHeading}>
                          {field}
                        </TableCell>
                      )
                    })}
                  </TableRow>

                  <TableRow key='Shubham Agrawal'>
                    {[
                      data.bowling[0].player_name,
                      data.bowling[0].overs_bowled,
                      data.bowling[0].runs_given,
                      data.bowling[0].wickets,
                      data.bowling[0].extras,
                      data && data.bowling[0].overs_bowled
                        ? getRunRate(
                            data.bowling[0].runs_given,
                            data.bowling[0].overs_bowled
                          )
                        : '0.00',
                    ].map((value) => {
                      return (
                        <TableCell component='th' scope='row'>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return <Loader />
  }
}
