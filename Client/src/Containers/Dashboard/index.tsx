import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import MatchCard from '../../Components/MatchCard'
// import { getAllMatchData } from '../../api/actions'
import { apiCalls } from 'crickboardapi'
import Loader from '../../Components/Loader'
import { socket } from '../../socket'
import useStyles from './style'
import Snackbar from '../../Components/SnackBar'
import {
  JOIN_MATCH,
  LIVE_MATCHES_ROOM,
  LEAVE_MATCH,
  MATCH_CREATED,
  TOSS_UPDATED,
  BALL_UPDATED,
} from '../../Constants/socketEvents'
import { useCrickStore } from '../../store'
import AxiosContext from '../../context/axios';
type Istateprops = {
  matches: Array<{
    currentBattingTeam: string
    currentInnings: number
    matchId: number
    matchName: string
    max_overs: number
    overs: number
    result: string
    score: number
    startTime: null
    target: number
    teamOneName: string
    teamTwoName: string
    toss: string
    venue: string
    wickets: number
  }>
}

export default function Index({
  loggedinUser,
  filter = false,
  location,
  ...rest
}: any) {
  let axios = React.useContext(AxiosContext);
  const {getAllMatchData} = apiCalls(axios);
  const classes = useStyles()
  const [matches, setMatches] = useState<Istateprops['matches']>(
    [] as Istateprops['matches']
  )
  const [loading, setLoading] = useState(false)
  const { subscriptions } = useCrickStore()
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: '',
    type: '',
  })
  useEffect(() => {
    socket.emit(JOIN_MATCH, LIVE_MATCHES_ROOM)
    let mounted = true
    const initializeDashboard = async () => {
      setLoading(true)
      const matchesData = await getAllMatchData()

      if (!mounted) {
        setLoading(false)
        return
      }
      setMatches(matchesData.data)
      setLoading(false)
    }
    initializeDashboard()
    if (new Date(loggedinUser.expiredDate) <= new Date()) {
      localStorage.setItem('user', '{}')
      localStorage.setItem('isLoggedIn', JSON.stringify(false))
    }
    return () => {
      socket.emit(LEAVE_MATCH, LIVE_MATCHES_ROOM)
      mounted = false
    }
  }, [loggedinUser.expiredDate])

  useEffect(() => {
    socket.on(BALL_UPDATED, (data: any) => {
      setMatches((prevMatches: any) => {
        const updatedMatchIndex = prevMatches.findIndex(
          (match: any) => match.matchId === data.matchId
        )
        const newMatches = [...prevMatches]
        newMatches[updatedMatchIndex] = {
          ...newMatches[updatedMatchIndex],
          ...data.matchData,
        }

        return newMatches
      })
    })
    socket.on(MATCH_CREATED, (data: any) => {
      setMatches((prevMatches) => {
        const newMatches = [...prevMatches, data.matchData]
        return newMatches
      })
    })
    socket.on(TOSS_UPDATED, (data: any) => {
      setMatches((prevMatches) => {
        const updatedMatchIndex = prevMatches.findIndex(
          (match: any) => match.matchId === data.matchId
        )
        const newMatches = [...prevMatches]
        newMatches[updatedMatchIndex] = {
          ...newMatches[updatedMatchIndex],
          result: data.result,
          toss: data.toss,
        }

        return newMatches
      })
    })
  }, [])
  if (location && location.challenge) {
    setSnackBar(location.challenge)
  }
  if (!loading) {
    var filteredMatches = filter
      ? matches.filter((match) =>
          subscriptions.some(
            (sub: { id: number; matchId: number }) =>
              sub.matchId === match.matchId
          )
        )
      : matches
    filteredMatches.sort((a, b) =>
      a.matchId > b.matchId ? 1 : b.matchId > a.matchId ? -1 : 0
    )
    if (filteredMatches.length !== 0) {
      return (
        <div className={classes.root}>
          <Grid container spacing={2}>
            {filteredMatches.map((match: any) => {
              return (
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  spacing={5}
                  className={classes.wrapper}
                >
                  <MatchCard
                    key={match.matchId}
                    matchData={match}
                    loggedinUser={loggedinUser}
                    history={rest.history}
                  />
                </Grid>
              )
            })}
          </Grid>
          <Snackbar
            isOpen={snackBar.value}
            message={snackBar.message}
            setIsOpen={setSnackBar}
            type={snackBar.type}
          />
        </div>
      )
    } else {
      return (
        <Typography
          component='h1'
          color='secondary'
          variant='h4'
          align='center'
        >
          No Matches Found
        </Typography>
      )
    }
  } else {
    return (
      <Typography align='center'>
        <Loader />
      </Typography>
    )
  }
}
