import React from 'react'
// import { getTeams, changeStrick, getPlayer } from '../../../api/actions'
import { apiCalls } from 'crickboardapi'
import Loader from '../../../Components/Loader'
import { socket } from '../../../socket'
import {
  LIVE_UPDATE,
  JOIN_MATCH,
  LEAVE_MATCH,
  NEW_BATSMANN,
} from '../../../Constants/socketEvents'
import BatsmanModal from '../../../Components/PlayerModal'
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
  }
  setLive: Function
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
}: Iprops) {
  let axios = React.useContext(AxiosContext);
  const { getTeams, changeStrick, getPlayer } = apiCalls(axios)
  const [teamsData, setTeamsData] = React.useState<IstateProps['teamsData']>(
    [] as IstateProps['teamsData']
  )

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
          strickerId: checked,
        },
        matchId
      )

      const res = await getPlayer(checked, matchId)
      socket.emit(NEW_BATSMANN, {
        room: matchId,
        batsmanData: res.data,
      })
      setTeamsData((prevData) => {
        const newData = [...prevData]
        const battingTeamIndex = newData.findIndex(
          (team) => team.teamId === liveData.battingTeam
        )
        const battingTeam = newData[battingTeamIndex]
        const player = battingTeam.players.findIndex(
          (prevBat: any) => prevBat.playerId === liveData.strickerId
        )
        battingTeam.players[player].outSummary = 'Out'
        return newData
      })
      setLive((prevData: Iprops['liveData']) => {
        const newData = { ...prevData }

        const batsmanIndex = newData.batting.findIndex(
          (batsman: any) => batsman.playerId === liveData.strickerId
        )
        newData.batting[batsmanIndex] = {
          ...newData.batting[batsmanIndex],
          ...res.data,
        }
        newData.strickerId = checked
        setChecked(0)
        socket.emit(LIVE_UPDATE, {
          room: matchId,
          newData: newData,
        })
        return newData
      })
      handleClose()
    }
  }
  if (teamsData) {
    return (
      <BatsmanModal
        type='Batsman'
        teamsData={teamsData}
        isOpen={isOpen}
        data={data}
        handleToggle={handleToggle}
        liveData={liveData}
        checked={checked}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    )
  } else {
    return <Loader />
  }
}
