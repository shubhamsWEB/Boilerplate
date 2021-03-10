import React, { RefObject, Suspense } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Divider,
  CircularProgress,
} from '@material-ui/core'

import BallsData from './balls'
import LiveScore from './liveScoreCard'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';
// import { undoLiveScore } from '../../api/actions'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { withStyles } from '@material-ui/core/styles'
import Loader from '../Loader'
import Snackbar from '../SnackBar'
import useStyles from '../../Containers/AdminDashboard/style'
import { undoBall } from '../../utils/undoBall'
const BatsmanModal = React.lazy(() => import('../../Containers/Modals/Batsman'))
const BowlerModal = React.lazy(() => import('../../Containers/Modals/Bowler'))
const OpeningModal = React.lazy(() => import('../../Containers/Modals/Opening'))
const RunOutModal = React.lazy(() => import('../../Containers/Modals/Runout'))

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup)

type Iprops = {
  matchId: number
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
  matchInfo: {
    adminId: string
    createdAt: string
    id: number
    isCompleted: number
    match_name: string
    max_overs: number
    result: string
    start_time: null
    team_a_id: number
    team_b_id: number
    toss: string
    updatedAt: string
    venue: string
  }
  ballsData: Array<{
    ball_number: number
    ball_summary: string
    commentary: string
    id: number
    innings: number
    matchId: number
    score_summary: string
  }>
  setLiveData: (data:Iprops['liveData'])=>void
  OpenBatsmanModal: ()=>void,
  OpenBowlerModal: ()=>void
  batsmanModal: boolean
  bowlerModal: boolean
  runOutModal: boolean
  openingModal: boolean
  endInnings: (score: number) => void
  setBatsmanModal: (data:boolean)=>void
  setBowlerModal: (data:boolean)=>void
  setRunOutModal: (data:boolean)=>void
  setOpeningModal: (data:boolean)=>void
  changeBatsman: ()=>void
  scoreUpdate: ()=>void
  loading: boolean
  wkt: Array<string>
  handleWickets: (event:React.MouseEvent<HTMLElement, MouseEvent>,value:string)=>void
  wickets: string
  xtra: Array<{ type: string }>
  handleExtras: (event:React.MouseEvent<HTMLElement, MouseEvent>,value:number)=>void
  extras: number
  Rns: Array<number>
  handleRuns: (event:React.MouseEvent<HTMLElement, MouseEvent>,value:number)=>void
  runs: number
  commentryRef: RefObject<string>
  snackBar: { value: boolean; message: string; type: string }
  setSnackBar: (data: { value: boolean; message: string; type: string }) => void
  prevScore: {
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
  deleteScore: Function,
  history:{push:Function}
}

function Index({
  matchId,
  liveData,
  matchInfo,
  ballsData,
  setLiveData,
  OpenBatsmanModal,
  OpenBowlerModal,
  batsmanModal,
  bowlerModal,
  runOutModal,
  openingModal,
  endInnings,
  setBatsmanModal,
  setBowlerModal,
  setRunOutModal,
  setOpeningModal,
  changeBatsman,
  scoreUpdate,
  loading,
  wkt,
  handleWickets,
  wickets,
  xtra,
  handleExtras,
  extras,
  Rns,
  handleRuns,
  runs,
  commentryRef,
  snackBar,
  setSnackBar,
  prevScore,
  deleteScore,
  history,
}: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {undoLiveScore} = apiCalls(axios);
  const classes = useStyles()
  const handelOnchangeBatsman = async () => {
    await changeBatsman()
  }
  const handelUpdateScore = async (e: any) => {
    e.preventDefault()
    await scoreUpdate()
  }

  const undo = async () => {
    const undoData = await undoBall(prevScore, liveData, matchId)
    await undoLiveScore(undoData, ballsData[0].id)
    deleteScore()

    window.location.reload()
  }

  const handelOnEndInnings = (score: number) => {
    endInnings(score)
  }


  if (matchInfo && liveData && ballsData) {
    if (matchInfo.isCompleted === 0) {
      return (
        <form className={classes.root}>
          <Divider />

          <Typography
            className={classes.heading}
            align='center'
            color='primary'
            variant='h4'
            component='h1'
          >
            Admin Scoreboard
          </Typography>

          <Divider />

          <Snackbar
            isOpen={snackBar.value}
            message={snackBar.message}
            setIsOpen={setSnackBar}
            type={snackBar.type}
          />

          <Grid container xs={12}>
            <Grid item container xs={12} className={classes.mid}>
              <Paper elevation={0} className={classes.paper}>
                <Grid container xs={12} className={classes.gridWrapperTop}>
                  <Grid item xs={12} sm={4} className={classes.gridsTopLeft}>
                    <Typography color='primary' component='p' variant='h6'>
                      {matchInfo.match_name}
                    </Typography>

                    <Typography component='p' variant='subtitle2'>
                      Venue: {matchInfo.venue}
                    </Typography>

                    <Typography
                      color='secondary'
                      component='p'
                      variant='caption'
                    >
                      {matchInfo.toss}
                    </Typography>
                  </Grid>

                  <BallsData
                    ballsInfo={ballsData}
                    currentInnings={liveData.currentInnings}
                  />
                </Grid>

                <Grid container xs={12} className={classes.gridWrapperMiddle}>
                  <LiveScore
                    maxOvers={matchInfo.max_overs}
                    liveInfo={liveData}
                  />

                  <Grid
                    item
                    container
                    xs={12}
                    sm={4}
                    className={classes.gridsMiddleRight}
                  >
                    {[
                      {
                        func: () => handelOnchangeBatsman(),
                        buttonText: 'change strike',
                      },
                      { func: OpenBatsmanModal, buttonText: 'Retired hurt' },
                      { func: OpenBowlerModal, buttonText: 'change bowler' },
                      {
                        func: () => handelOnEndInnings(liveData.score),
                        buttonText: 'end innings',
                      },
                    ].map((fields, index) => {
                      return (
                        <Grid xs={6} className={classes.midRight}>
                          <Button
                            disabled={loading}
                            onClick={fields.func}
                            variant='contained'
                            color={index === 3 ? 'secondary' : 'primary'}
                          >
                            <Typography
                              className={classes.buttonText}
                              component='span'
                              variant='caption'
                            >
                              {fields.buttonText}
                            </Typography>
                          </Button>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
                <Suspense fallback={'Loading...'}>
                  <BatsmanModal
                    isOpen={batsmanModal}
                    action={setBatsmanModal}
                    data={{
                      battingTeam: liveData.battingTeam,
                      bowlingTeam: liveData.bowlingTeam,
                    }}
                    liveData={liveData}
                    setLive={setLiveData}
                    matchId={matchId}
                  />

                  <BowlerModal
                    isOpen={bowlerModal}
                    action={setBowlerModal}
                    data={{
                      battingTeam: liveData.battingTeam,
                      bowlingTeam: liveData.bowlingTeam,
                    }}
                    matchId={matchId}
                    liveData={liveData}
                    setLive={setLiveData}
                  />

                  <RunOutModal
                    isOpen={runOutModal}
                    action={setRunOutModal}
                    data={{
                      battingTeam: liveData.battingTeam,
                      bowlingTeam: liveData.bowlingTeam,
                    }}
                    matchId={matchId}
                    liveData={liveData}
                    setLive={setLiveData}
                    batsmanModal={OpenBatsmanModal}
                  />

                  <OpeningModal
                    isOpen={openingModal}
                    action={setOpeningModal}
                    data={{
                      battingTeam: liveData.battingTeam,
                      bowlingTeam: liveData.bowlingTeam,
                    }}
                    matchId={matchId}
                    liveData={liveData}
                    setLiveData={setLiveData}
                    history = {history}
                  />
                </Suspense>

                <Grid container xs={12} className={classes.gridWrapperBottom}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      id='Note'
                      multiline
                      rows={5}
                      label='Your commentry here...'
                      name='commentry'
                      autoComplete='off'
                      type='text'
                      inputRef={commentryRef}
                    />
                  </Grid>

                  <Grid item container xs={12} md={8}>
                    <Grid xs={12}>
                      <Typography
                        color='primary'
                        variant='h6'
                        component='p'
                        align='center'
                      >
                        Runs
                      </Typography>
                    </Grid>

                    <Grid xs={12} className={classes.bottomRightTop}>
                      <StyledToggleButtonGroup
                        value={runs}
                        exclusive
                        onChange={handleRuns}
                        aria-label='Runs Scored'
                        size='large'
                      >
                        {Rns.map((run: number, key: number) => {
                          return (
                            <ToggleButton key={key} value={run}>
                              {run}
                            </ToggleButton>
                          )
                        })}
                      </StyledToggleButtonGroup>
                    </Grid>

                    <Grid container xs={12} className={classes.bottomRightMid}>
                      <Grid
                        item
                        container
                        xs={12}
                        sm={5}
                        className={classes.gridsBottomRight}
                      >
                        <Grid xs={12}>
                          <Typography
                            color='primary'
                            variant='h6'
                            component='p'
                            align='center'
                          >
                            Extras
                          </Typography>
                        </Grid>

                        <Grid xs={12} className={classes.midRight}>
                          <StyledToggleButtonGroup
                            value={extras}
                            exclusive
                            onChange={handleExtras}
                            aria-label='Extras'
                            size='medium'
                          >
                            {xtra.map((extra: any, k: any) => {
                              return (
                                <ToggleButton key={k} value={k}>
                                  <Typography
                                    className={classes.buttonText}
                                    component='span'
                                    variant='subtitle2'
                                  >
                                    {extra.type}
                                  </Typography>
                                </ToggleButton>
                              )
                            })}
                          </StyledToggleButtonGroup>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        xs={12}
                        sm={5}
                        className={classes.gridsBottomRight}
                      >
                        <Grid xs={12}>
                          <Typography
                            color='primary'
                            variant='h6'
                            component='p'
                            align='center'
                          >
                            Wicket
                          </Typography>
                        </Grid>

                        <Grid xs={12} className={classes.midRight}>
                          <StyledToggleButtonGroup
                            value={wickets}
                            exclusive
                            onChange={handleWickets}
                            aria-label='Wickets'
                            size='medium'
                          >
                            {wkt.map((wicket: any, key: any) => {
                              return (
                                <ToggleButton key={key} value={wicket}>
                                  <Typography
                                    className={classes.buttonText}
                                    component='span'
                                    variant='subtitle2'
                                  >
                                    {wicket}
                                  </Typography>
                                </ToggleButton>
                              )
                            })}
                          </StyledToggleButtonGroup>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid xs={12}>
                      <Grid xs={12} className={classes.midRight}>
                        <Button
                          disabled={loading}
                          onClick={handelUpdateScore}
                          variant='contained'
                          color='primary'
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

                          <Typography
                            className={classes.buttonText}
                            component='span'
                            variant='caption'
                          >
                            Submit
                          </Typography>
                        </Button>

                        <Button
                          disabled={loading}
                          variant='contained'
                          color='secondary'
                          onClick={() => undo()}
                        >
                          <Typography
                            className={classes.buttonText}
                            component='span'
                            variant='caption'
                          >
                            undo
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      )
    } else {
      return (
        <Typography component='h1' color='secondary' variant='h4'>
          Match has been ended {matchInfo.result}
        </Typography>
      )
    }
  } else {
    return <Loader />
  }
}
export default Index
