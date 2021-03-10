import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import Loader from '../Loader'
import { getRunRate } from '../../utils/getRunRate'
import { computeExtras } from '../../utils/getBallsInfo'
import useStyles from '../../Containers/SingleMatch/MatchScorecard/style'
import { Divider } from '@material-ui/core'
import clsx from 'clsx'

type Iprops = {
  matchId: number
  data: {
    battingTeam: { team_name: string; id: number }
    bowlingTeam: { team_name: string; id: number }
    matchData: {
      current_batting_team: number
      current_bowling_team: number
      current_innings: number
      isCompleted: number
      match: {
        venue: string
        toss: string
        max_overs: number
        result: string
      }
      matchId: number
      overs: number
      score: number
      team_a_overs: number
      team_a_score: number
      team_a_wickets: number
      team_b_overs: number
      team_b_score: number
      team_b_wickets: number
      wickets: number
    }
  }
  scoreCard: {
    Innings: Array<{
      batting: Array<{
        balls_faced: number
        extras: number
        fours: number
        maidens: number
        matchId: number
        out_summary: string
        overs_bowled: number
        playerId: number
        player_name: string
        runs: number
        runs_given: number
        sixs: number
        teamId: number
        wickets: number
      }>
      bowling: Array<{
        balls_faced: number
        extras: number
        fours: number
        maidens: number
        matchId: number
        out_summary: string
        overs_bowled: number
        playerId: number
        player_name: string
        runs: number
        runs_given: number
        sixs: number
        teamId: number
        wickets: number
      }>
      innings: number
    }>
    firstInningsHighlights: Array<{
      ball_number: number
      ball_summary: string
      commentary: string
      id: number
      innings: number
    }>
    matchData: { totalScore: number; totalOvers: number }
    matchScoreCard: Array<{
      balls_faced: number
      extras: number
      fours: number
      maidens: number
      matchId: number
      out_summary: string
      overs_bowled: number
      playerId: number
      player_name: string
      runs: number
      runs_given: number
      sixs: number
      teamId: number
      wickets: number
    }>
    secondInningsHighlights: Array<{
      ball_number: number
      ball_summary: string
      commentary: string
      id: number
      innings: number
    }>
  }
}

export default function BasicTable({ matchId, data, scoreCard }: Iprops) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState('')
  const handleChange = (panel: string) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : '')
  }
  const renderScoreCard = () => {
    let inng2Balls: {
      wide: number
      noBall: number
      fallOfWickets: Array<{}>
      totalExtras: number
      byes: number
      legByes: number
    }
    let inng1Balls: {
      wide: number
      noBall: number
      fallOfWickets: Array<{}>
      totalExtras: number
      byes: number
      legByes: number
    }
    let extras1: string
    let extras2: string
    let wicketstr1: string
    let wicketstr2: string
    if (data.matchData.current_innings === 2) {
      inng2Balls = computeExtras(scoreCard.secondInningsHighlights)
      extras2 = `(nb-${inng2Balls.noBall},wd-${inng2Balls.wide},b-${inng2Balls.byes},lb-${inng2Balls.legByes})`
      wicketstr2 = `(${inng2Balls.fallOfWickets.length} wickets)`
    }
    inng1Balls = computeExtras(scoreCard.firstInningsHighlights)
    extras1 = `(nb-${inng1Balls.noBall},wd-${inng1Balls.wide},b-${inng1Balls.byes},lb-${inng1Balls.legByes})`
    wicketstr1 = `(${inng1Balls.fallOfWickets.length} wickets)`
    return scoreCard.Innings.map(
      (
        inng: {
          batting: Array<{
            balls_faced: number
            extras: number
            fours: number
            maidens: number
            matchId: number
            out_summary: string
            overs_bowled: number
            playerId: number
            player_name: string
            runs: number
            runs_given: number
            sixs: number
            teamId: number
            wickets: number
          }>
          bowling: Array<{
            balls_faced: number
            extras: number
            fours: number
            maidens: number
            matchId: number
            out_summary: string
            overs_bowled: number
            playerId: number
            player_name: string
            runs: number
            runs_given: number
            sixs: number
            teamId: number
            wickets: number
          }>
          innings: number
        },
        key: number
      ) => {
        return (
          <Accordion
            key={key}
            expanded={expanded === `panal${inng.innings}`}
            onChange={handleChange(`panal${inng.innings}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography className={classes.heading}>
                Innings {inng.innings}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableHead>
                        <TableRow className={classes.tableHeader}>
                          {[
                            'Batting',
                            'Status',
                            'Runs',
                            'Balls',
                            '4s',
                            '6s',
                            'SR',
                          ].map((field) => {
                            return (
                              <TableCell className={classes.TableHeading}>
                                {field}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {inng.batting
                          .filter(function (player: {
                            balls_faced: number
                            extras: number
                            fours: number
                            maidens: number
                            matchId: number
                            out_summary: string
                            overs_bowled: number
                            playerId: number
                            player_name: string
                            runs: number
                            runs_given: number
                            sixs: number
                            teamId: number
                            wickets: number
                          }) {
                            return player.out_summary !== 'Yet to bat'
                          })
                          .map(
                            (row: {
                              balls_faced: number
                              extras: number
                              fours: number
                              maidens: number
                              matchId: number
                              out_summary: string
                              overs_bowled: number
                              playerId: number
                              player_name: string
                              runs: number
                              runs_given: number
                              sixs: number
                              teamId: number
                              wickets: number
                            }) => (
                              <TableRow key={row.playerId}>
                                {[
                                  row.player_name,
                                  row.out_summary,
                                  row.runs,
                                  row.balls_faced,
                                  row.fours,
                                  row.sixs,
                                  row.balls_faced === 0
                                    ? '0.00'
                                    : // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                                      (row.runs / row.balls_faced).toFixed(2) *
                                      100,
                                ].map((field) => {
                                  return (
                                    <TableCell component='th' scope='row'>
                                      {field}
                                    </TableCell>
                                  )
                                })}
                              </TableRow>
                            )
                          )}
                        <TableRow key='extras' className={classes.ExtrasRow}>
                          {[
                            0,
                            inng.innings === 1 ? extras1 : extras2,
                            inng.innings === 1
                              ? inng1Balls.totalExtras
                              : inng2Balls.totalExtras,
                          ].map((field, index) => {
                            return (
                              <TableCell
                                component='th'
                                scope='row'
                                colSpan={index === 2 ? 5 : 1}
                              >
                                {index === 0 ? 'EXTRAS' : field}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                        <TableRow key='total'>
                          {[
                            0,
                            inng.innings === 1 ? wicketstr1 : wicketstr2,
                            inng.innings === 1
                              ? data.matchData.current_innings === 1
                                ? data.matchData.score
                                : data.matchData.team_a_score
                              : data.matchData.score,
                          ].map((field, index) => {
                            return (
                              <TableCell
                                component='th'
                                scope='row'
                                colSpan={index === 2 ? 5 : 1}
                                className={classes.TotalScoreRow}
                              >
                                {index === 0 ? 'TOTAL' : field}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} sm={8} className={classes.marginTop}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableHead>
                        <TableRow className={classes.tableHeader}>
                          {[
                            'Bowling',
                            'Overs',
                            'Runs',
                            'Wickets',
                            'Econ',
                            'Extras',
                          ].map((field) => {
                            return (
                              <TableCell className={classes.TableHeading}>
                                {field}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {inng.bowling.map(
                          (row: {
                            balls_faced: number
                            extras: number
                            fours: number
                            maidens: number
                            matchId: number
                            out_summary: string
                            overs_bowled: number
                            playerId: number
                            player_name: string
                            runs: number
                            runs_given: number
                            sixs: number
                            teamId: number
                            wickets: number
                          }) =>
                            row.overs_bowled !== 0 ? (
                              <TableRow key={row.playerId}>
                                {[
                                  row.player_name,
                                  row.overs_bowled,
                                  row.runs_given,
                                  row.wickets,
                                  getRunRate(row.runs_given, row.overs_bowled),
                                  row.extras,
                                ].map((field) => {
                                  return (
                                    <TableCell component='th' scope='row'>
                                      {field}
                                    </TableCell>
                                  )
                                })}
                              </TableRow>
                            ) : null
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.marginTop}>
                  <Paper elevation={0}>
                    <Typography
                      variant='subtitle1'
                      className={clsx(
                        classes.textWhite,
                        classes.fallOfWicketsHeading
                      )}
                    >
                      Fall of Wickets
                    </Typography>
                    <ul className={classes.fallOfWickets}>
                      <li className={classes.listItemTop}>
                        <Typography variant='subtitle1' color='secondary'>
                          Score
                        </Typography>
                        <Typography variant='subtitle1' color='primary'>
                          Overs
                        </Typography>
                      </li>
                      <Divider className={classes.topDivider} />
                      {(inng.innings === 1 ? inng1Balls : inng2Balls) &&
                      inng ? (
                        (inng.innings === 1
                          ? inng1Balls
                          : inng2Balls
                        ).fallOfWickets.map((ball: any, key: any) => {
                          const scoreSummary = ball.score_summary.split(',')
                          return (
                            <div key={key}>
                              <li className={classes.listItem}>
                                <span>
                                  {scoreSummary[0]} ({scoreSummary[1]})
                                </span>
                                <span>({ball.ball_number} ov)</span>
                              </li>
                              <Divider className={classes.topDivider} />
                            </div>
                          )
                        })
                      ) : (
                        <Typography
                          variant='subtitle1'
                          component='h6'
                          align='center'
                        >
                          No wickets to show
                        </Typography>
                      )}
                    </ul>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      }
    )
  }
  if (data && scoreCard) {
    return <div className={classes.root}>{renderScoreCard()}</div>
  } else {
    return <Loader />
  }
}
