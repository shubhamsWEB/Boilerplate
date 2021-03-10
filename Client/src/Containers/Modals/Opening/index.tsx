import React from 'react'
// import { getTeams, changeStrick } from '../../../api/actions'
import {apiCalls} from 'crickboardapi';
import Loader from '../../../Components/Loader'
import OpeningModal from '../../../Components/OpeningModal'
// import { getPlayer } from '../../../api/actions'
import AxiosContext from '../../../context/axios';
type Iprops = {
  isOpen: boolean
  action: (value: boolean) => void
  data: {
    battingTeam: number
    bowlingTeam: number
  }
  matchId: number
  liveData ?: {
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
  setLiveData ?: Function,
  history:{push:Function}
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
  setLiveData,
  history,
}: Iprops) {
  let axios = React.useContext(AxiosContext);
const {getTeams, changeStrick,getPlayer} = apiCalls(axios);
  const [teamsData, setTeamsData] = React.useState<IstateProps["teamsData"]>([] as IstateProps['teamsData'])
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: '',
    type: '',
  })
  React.useEffect(() => {
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
    }
  }, [matchId])

  const handleClose = () => {
    action(false)
  }
  const [checkedBowler, setChecked] = React.useState<number>(0)
  const [checkedBatsman, setCheckedBatsman] = React.useState<Array<number>>([] )

  const handleToggle = (value:number)=> {
    
    setChecked(value)
  }

  const handleBatsmanChange = (value:number) => {
    let selectedBatsman = [...checkedBatsman]
    const currentIndex = selectedBatsman.indexOf(value)
    if (currentIndex === -1) {
      if (selectedBatsman.length < 2) {
        selectedBatsman.push(value)
      }
    } else {
      selectedBatsman.splice(currentIndex, 1)
    }
    setCheckedBatsman(selectedBatsman)
  }

  const handleSubmit = async () => {
    if (checkedBowler !== 0 && checkedBatsman.length === 2) {
      const updateData = {
        bowlerId: checkedBowler,
        strickerId: checkedBatsman[0],
        nonStrickerId: checkedBatsman[1],
      }
      await changeStrick(updateData, matchId)
      const bowlerResponse = await getPlayer(checkedBowler, matchId)
      const strickerResponse = await getPlayer(checkedBatsman[0], matchId)
      const nonStrickerResponse = await getPlayer(checkedBatsman[1], matchId)
      if (liveData&&setLiveData) {
        setLiveData((prevData: any) => {
          const newStateData = { ...prevData }
          newStateData.batting[0] = strickerResponse.data
          newStateData.batting[1] = nonStrickerResponse.data
          newStateData.bowling[0] = bowlerResponse.data
          newStateData.battingTeam = newStateData.bowlingTeam
          newStateData.bowlingTeam = newStateData.battingTeam
          newStateData.bowlerId = checkedBowler
          newStateData.strickerId = checkedBatsman[0]
          newStateData.nonStrickerId = checkedBatsman[1]
          newStateData.overs = 0
          newStateData.inningOneScore = newStateData.score
          newStateData.score = 0
          newStateData.wickets = 0
          newStateData.currentInnings = newStateData.currentInnings === 1 ? 2 : 1
          newStateData.battingTeamName = newStateData.bowlingTeamName
          newStateData.bowlingTeamName = newStateData.battingTeamName
          return newStateData
        })
      }
      setSnackBar({ value: true, message: 'Data Updated', type: 'green' })
      if (history) {
        history.push(`/quickmatch/${matchId}`)
      }
      handleClose()
      
    } else {
      setSnackBar({
        value: true,
        message: 'Data can not be updated,Select 2 batsman and 1 bowler',
        type: 'red',
      })
    }
  }
  if (teamsData) {
    return (
      <OpeningModal
      isOpen={isOpen}
        snackBar={snackBar}
        setSnackBar={setSnackBar}
        teamsData={teamsData}
        data={data}
        handleBatsmanChange={handleBatsmanChange}
        checkedBatsman={checkedBatsman}
        handleToggle={handleToggle}
        checkedBowler={checkedBowler}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    )
  } else {
    return <Loader />
  }
}