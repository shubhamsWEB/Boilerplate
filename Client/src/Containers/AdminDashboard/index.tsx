import React, { useEffect, Suspense } from 'react'
// import {
//   getMatchInfo,
//   getLiveData,
//   getTenBalls,
//   updateMatchInfo,
//   changeStrick,
//   updateLiveScore,
// } from '../../api/actions';
import { apiCalls } from 'crickboardapi'
import { useParams } from 'react-router'
import Loader from '../../Components/Loader'
import AdminScoreBoard from '../../Components/AdminDashboard'
import { Typography } from '@material-ui/core'
import { socket } from '../../socket'
import { endCurrentInnings } from '../../utils/endInnings'
import { UpdateScore } from '../../utils/updateScore'
import { updatedLiveData } from '../../utils/getUpdatedLiveData'
import AxiosContext from '../../context/axios';
import {
  JOIN_MATCH,
  LIVE_MATCHES_ROOM,
  LEAVE_MATCH,
  STRICK_CHANGED,
  BALL_UPDATED,
} from '../../Constants/socketEvents'
import { useCrickStore } from '../../store'
import { useIdleTimer } from 'react-idle-timer'
const SessionTimeoutModal = React.lazy(
  () => import('../../Components/sessionTimeoutModal')
)

type Iprops = {
  props: {
    loggedinUser: { userId: string; userName: string; expiredDate: Date }
    setLoginAuthenticated: Function
    setLoggedinUser: Function
    setAppSnakBar: Function
    history: { push: Function }
  }
}

type IstateProps = {
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
}

const AdminDashboard = ({
  loggedinUser,
  setLoginAuthenticated,
  setLoggedinUser,
  setAppSnakBar,
  history,
}: Iprops['props']) => {
  let axios = React.useContext(AxiosContext);
  const {
      getMatchInfo,
      getLiveData,
      getTenBalls,
      updateMatchInfo,
      changeStrick,
      updateLiveScore,
    } = apiCalls(axios)

  const { id } = useParams<{ id: number | any }>()
  const [timeout, setTimeout] = React.useState(false)
  const [matchId, setMatchId] = React.useState(id)
  const [matchInfo, setMatchInfo] = React.useState<IstateProps['matchInfo']>(
    {} as IstateProps['matchInfo']
  )
  const [liveData, setLiveData] = React.useState<IstateProps['liveData']>(
    {} as IstateProps['liveData']
  )
  const [ballsData, setBalls] = React.useState<IstateProps['ballsData']>([])
  const [hasErr, setErr] = React.useState(false)
  const [batsmanModal, setBatsmanModal] = React.useState(false)
  const [bowlerModal, setBowlerModal] = React.useState(false)
  const [openingModal, setOpeningModal] = React.useState(false)
  const [runOutModal, setRunOutModal] = React.useState(false)
  const commentryRef = React.useRef('')
  const [loading, setLoading] = React.useState(false)
  const { updatePrevScore, prevScore, deleteScore } = useCrickStore()
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: '',
    type: '',
  })
  const Rns = [0, 1, 2, 3, 4, 5, 6]
  const xtra = [
    { type: 'Ball' },
    { type: 'Wide' },
    { type: 'No Ball' },
    { type: 'Bye' },
    { type: 'Leg Bye' },
  ]
  const wkt = ['Not Out', 'Catch Out', 'Run Out', 'Bowled', 'Lbw']

  const [extras, setExtras] = React.useState(0)
  const handleExtras = (event: any, extra: any) => {
    setExtras(parseInt(extra))
  }

  const [wickets, setWickets] = React.useState('Not Out')
  const handleWickets = (event: any, wicket: any) => {
    setWickets(wicket)
  }

  const [runs, setRuns] = React.useState(0)
  const handleRuns = (event: any, run: any) => {
    setRuns(parseInt(run))
  }
  const OpenBatsmanModal = () => {
    setBatsmanModal(true)
  }
  const OpenBowlerModal = () => {
    setBowlerModal(true)
  }

  const OpenOpeningModal = () => {
    setOpeningModal(true)
  }
  const OpenRunOutModal = () => {
    setRunOutModal(true)
  }
  localStorage.setItem('matchId', JSON.stringify(matchId))
  useEffect(() => {
    let mounted = true
    socket.emit(JOIN_MATCH, matchId)
    socket.emit(JOIN_MATCH, LIVE_MATCHES_ROOM)
    if (new Date(loggedinUser.expiredDate) <= new Date()) {
      localStorage.setItem('user', '{}')
      localStorage.setItem('isLoggedIn', JSON.stringify(false))
    }
    const MatchInfo = async () => {
      try {
        const info = await getMatchInfo(matchId)
        if (!mounted) {
          return
        }
        if (info.status === 200) {
          setMatchInfo(info.data.data)
        } else {
          setErr(true)
        }
      } catch (error) {
        setErr(true)
      }
    }
    const LiveData = async () => {
      const liveData = await getLiveData(matchId)
      if (!mounted) {
        return
      }
      setLiveData(liveData.data)
    }

    MatchInfo()
    LiveData()
    return () => {
      mounted = false
    }
  }, [loggedinUser.expiredDate, matchId])

  useEffect(() => {
    let mounted = true
    const getBalls = async () => {
      if (liveData) {
        const Balls = await getTenBalls(matchId, liveData.currentInnings)
        if (!mounted) {
          return
        }
        setBalls(Balls.data)
      } else return
    }
    getBalls()
    return () => {
      mounted = false
      socket.emit(LEAVE_MATCH, matchId)
    }
  }, [matchId, liveData])

  const endInnings = async (score: any) => {
    let prompt = window.confirm('Are you sure you want to End Current Innings?')
    if (prompt) {
      if (liveData.currentInnings === 1) {
        const updatedData = await endCurrentInnings(liveData, matchId,changeStrick)
        setLiveData(updatedData)
        OpenOpeningModal()
      } else {
        if (liveData.inningOneScore > score) {
          await updateMatch(
            { result: `${liveData.bowlingTeamName} Won`, isCompleted: 1 },
            matchId
          )
          alert(`${liveData.bowlingTeamName} Won`)
        } else if (liveData.inningOneScore === liveData.score) {
          await updateMatch({ result: 'Tie Match', isCompleted: 1 }, matchId)
          alert('Tie Match')
        } else {
          await updateMatch(
            { result: `${liveData.battingTeamName} Won`, isCompleted: 1 },
            matchId
          )
          alert(`${liveData.battingTeamName} Won`)
        }
      }
    }
  }
  const handleOnIdle = (event: any) => {
    setTimeout(true)
  }
  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: handleOnIdle,
    debounce: 500,
  })

  const scoreUpdate = async () => {
    await UpdateScore(
      updateLiveScore,
      setLiveData,
      setBalls,
      OpenBowlerModal,
      setWickets,
      setExtras,
      setRuns,
      changeBatsman,
      setLoading,
      runs,
      setSnackBar,
      wickets,
      matchInfo,
      OpenBatsmanModal,
      OpenRunOutModal,
      endInnings,
      extras,
      matchId,
      socket,
      BALL_UPDATED,
      updatePrevScore,
      commentryRef,
      updatedLiveData,
      liveData,
      ballsData
    )
  }
  const changeBatsman = async () => {
    const changeStrickData = {
      strickerId: liveData.nonStrickerId,
      nonStrickerId: liveData.strickerId,
    }
    await changeStrick(changeStrickData, matchId)
    socket.emit(STRICK_CHANGED, {
      room: matchId,
      ...changeStrickData,
    })
    setLiveData((prevData) => {
      const newData = { ...prevData, ...changeStrickData }
      return newData
    })
  }

  const updateMatch = async (matchData: any, matchId: any) => {
    const response = await updateMatchInfo(matchData, matchId)
    return response
  }
  if (!hasErr) {
    if (matchInfo && liveData) {
      return (
        <React.Fragment>
          {timeout ? (
            <Suspense fallback={<Loader />}>
              <SessionTimeoutModal
                isOpen={timeout}
                setLoggedinUser={setLoggedinUser}
                setSnackBar={setAppSnakBar}
                setLoginAuthenticated={setLoginAuthenticated}
                setTimeout={setTimeout}
              />
            </Suspense>
          ) : null}
          <AdminScoreBoard
            matchInfo={matchInfo}
            liveData={liveData}
            ballsData={ballsData}
            matchId={matchId}
            setLiveData={setLiveData}
            OpenBatsmanModal={OpenBatsmanModal}
            OpenBowlerModal={OpenBowlerModal}
            batsmanModal={batsmanModal}
            bowlerModal={bowlerModal}
            openingModal={openingModal}
            runOutModal={runOutModal}
            endInnings={endInnings}
            setOpeningModal={setOpeningModal}
            setBatsmanModal={setBatsmanModal}
            setBowlerModal={setBowlerModal}
            setRunOutModal={setRunOutModal}
            changeBatsman={changeBatsman}
            scoreUpdate={scoreUpdate}
            loading={loading}
            wkt={wkt}
            handleWickets={handleWickets}
            wickets={wickets}
            xtra={xtra}
            handleExtras={handleExtras}
            extras={extras}
            Rns={Rns}
            handleRuns={handleRuns}
            runs={runs}
            commentryRef={commentryRef}
            snackBar={snackBar}
            setSnackBar={setSnackBar}
            prevScore={prevScore}
            deleteScore={deleteScore}
            history={history}
          />
        </React.Fragment>
      )
    } else {
      return <Loader />
    }
  } else {
    return (
      <Typography component='h1' color='secondary' variant='h5'>
        You are not authorized to Access this page
      </Typography>
    )
  }
}
export default AdminDashboard;