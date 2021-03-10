import React from 'react'
// import { getTeams, changeStrick, getPlayer } from '../../../api/actions'
import {apiCalls} from 'crickboardapi';
import Loader from '../../../Components/Loader';
import {socket} from '../../../socket';

import { LIVE_UPDATE,JOIN_MATCH,LEAVE_MATCH,NEW_BOWLER} from '../../../Constants/socketEvents';
import BowlerModal from '../../../Components/PlayerModal';
import AxiosContext from '../../../context/axios';

type Iprops = {
  isOpen: boolean
  action: (value: boolean) => void
  data: {
    battingTeam: number
    bowlingTeam: number
  }
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
  },
  setLive:Function
}


type IstateProps = {
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


export default function TransitionsModal({
  isOpen,
  action,
  data,
  matchId,
  liveData,
  setLive,
}:Iprops) {
  let axios = React.useContext(AxiosContext);
  const [teamsData, setTeamsData] = React.useState<IstateProps["teamsData"]>([] as IstateProps['teamsData'])
  const {getTeams, changeStrick, getPlayer} = apiCalls(axios)
  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId)
    let mounted = true
    const getTeamsData = async () => {
      const TeamData = await getTeams(matchId)
      if (!mounted) {
        return
      }
      setTeamsData(TeamData.data)
    }
    getTeamsData()
    return () => {
      mounted = false
      socket.emit(LEAVE_MATCH, matchId)
    }
  }, [matchId])

  const handleClose = () => {
    action(false)
  }
  const [checked, setChecked] = React.useState(0)

  const handleToggle = (value: any) => () => {
    setChecked(value)
  }
  const handleSubmit = async (e: any) => {
    if (checked !== 0) {
      await changeStrick(
        {
          bowlerId: checked,
        },
        matchId
      )
      const res = await getPlayer(checked, matchId)
      socket.emit(NEW_BOWLER, {
        room: matchId,
        bowlerData:res.data
      })
      setLive((prevData: Iprops["liveData"]) => {
        const newData = { ...prevData }
        newData.bowling[0] = { ...newData.bowling[0], ...res.data }
        newData.bowlerId = checked
        setChecked(0)
        return newData
      })
      socket.emit(LIVE_UPDATE, {
        room: matchId,
        newData:{...liveData}
      })
      handleClose()
    }
  }
  if (teamsData) {
    return (
          <BowlerModal type="Bowler" teamsData={teamsData} isOpen={isOpen} data={data} handleToggle={handleToggle} liveData={liveData} checked={checked} handleSubmit={handleSubmit} handleClose={handleClose}/>
    )
  } else {
    return <Loader />
  }
}
