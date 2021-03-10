import React from 'react'
// import { getTeams, changeStrick} from '../../../api/actions'
import {apiCalls} from 'crickboardapi';
import Loader from '../../../Components/Loader';
import {socket} from '../../../socket';
import AxiosContext from '../../../context/axios'
import {JOIN_MATCH,LEAVE_MATCH} from '../../../Constants/socketEvents'
import RunOutModal from '../../../Components/RunOutModal';

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
  setLive:Function,
  batsmanModal:() => void
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
  batsmanModal,
}:Iprops) {
  let axios = React.useContext(AxiosContext);
  const [teamsData, setTeamsData] = React.useState<IstateProps["teamsData"]>([] as IstateProps['teamsData'])
const {getTeams,changeStrick} = apiCalls(axios);

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
      setLive((prevData: any) => {
        const newData = { ...prevData }
        newData.strickerId = checked
        const stricker = newData.batting.filter((player: any) => player.playerId === newData.strickerId);
        stricker.out_summary = "Run Out";
        setChecked(0);
        return newData
      })
      handleClose()
      batsmanModal()
      
    }
  }
  if (teamsData) {
    return (
    <RunOutModal  teamsData={teamsData} isOpen={isOpen}  handleToggle={handleToggle} liveData={liveData} checked={checked} handleSubmit={handleSubmit} handleClose={handleClose}/>
    )
  } else {
    return <Loader />
  }
}
