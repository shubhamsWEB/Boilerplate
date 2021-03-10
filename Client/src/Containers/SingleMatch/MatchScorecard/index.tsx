import React from 'react'
// import { getScoreCard } from '../../../api/actions'
import {apiCalls} from 'crickboardapi';
import Loader from '../../../Components/Loader'
import Scorecard from '../../../Components/ScoreCard'
import useStyles from './style'
import { updateScoreCard } from '../../../utils/setScoreCard'
import { socket } from '../../../socket'
import AxiosContext from '../../../context/axios';
import {
  JOIN_MATCH,
  NEW_BATSMANN,
  NEW_BOWLER,
  LEAVE_MATCH,
  BALL_UPDATED,
} from '../../../Constants/socketEvents'

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
}
type IstateProps = {
  newData: {
    ballData: {
      ball_number: number
      ball_summary: string
      commentary: string
      innings: number
      matchId: number
      score_summary: string
    }
    batsmanData: {
      balls_faced: number
      fours: number
      playerId: number
      runs: number
      sixs: number
    }
    batsmanId: number
    bowlerData: {
      extras: number
      overs_bowled: number
      playerId: number
      runs_given: number
      wickets: number
    }
    bowlerId: number
    matchData: {
      overs: string
      score: number
      wickets: number
    }
    room: string
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

export default function BasicTable({ matchId, data }: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {getScoreCard} = apiCalls(axios);
  const classes = useStyles()
  const [scoreCard, setScoreCard] = React.useState<
    IstateProps['scoreCard'] | undefined
  >()

  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId)
    let mounted = true
    const getFullScoreCard = async () => {
      const CData = await getScoreCard(
        matchId,
        data.battingTeam.id,
        data.bowlingTeam.id,
        data.matchData.current_innings
      )
      if (!mounted) {
        return
      }
      setScoreCard(CData.data)
    }
    getFullScoreCard()
    return () => {
      socket.emit(LEAVE_MATCH, matchId)
      mounted = false
    }
  }, [
    data.battingTeam.id,
    data.bowlingTeam.id,
    data.matchData.current_innings,
    matchId,
  ])

  React.useEffect(() => {
    socket.on(BALL_UPDATED, (newData: IstateProps['newData']) => {
      setScoreCard((prevData) => {
        return updateScoreCard(prevData, data, newData)
      })
    })

    socket.on(NEW_BOWLER, (newData: any) => {
      if (data.matchData.current_innings === 1) {
        setScoreCard((prevData: any) => {
          const newStateData = { ...prevData }
          newStateData.Innings[0].bowling.push(newData)
          return newStateData
        })
      } else {
        setScoreCard((prevData: any) => {
          const newStateData = { ...prevData }
          newStateData.Innings[1].bowling.push(newData)
          return newStateData
        })
      }
    })
    socket.on(NEW_BATSMANN, (newData: any) => {
      if (data.matchData.current_innings === 1) {
        setScoreCard((prevData: any) => {
          const newStateData = { ...prevData }
          newStateData.Innings[0].batting.push(newData)
          return newStateData
        })
      } else {
        setScoreCard((prevData: any) => {
          const newStateData = { ...prevData }
          newStateData.Innings[1].batting.push(newData)
          return newStateData
        })
      }
    })
  }, [data])

  if (data && scoreCard) {
    return (
      <div className={classes.root}>
        <Scorecard matchId={matchId} data={data} scoreCard={scoreCard} />
      </div>
    )
  } else {
    return <Loader />
  }
}