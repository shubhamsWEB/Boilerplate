import React from 'react'
// import { getTeams } from '../../../api/actions'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../../context/axios';
import Loader from '../../../Components/Loader'
import Teams from '../../../Components/Teams'

type Iprops = {
  matchId: number
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
export default function SelectedListItem({ matchId }: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {getTeams} = apiCalls(axios);
  const [teamsData, setTeamsData] = React.useState<IstateProps["teamsData"]>([] as IstateProps["teamsData"])
  React.useEffect(() => {
    let mounted = true
    const getTeamsData = async () => {
      const TeamsData = await getTeams(matchId)
      if (!mounted) {
        return
      }
      setTeamsData(TeamsData.data)
    }
    getTeamsData()
    return () => {
      mounted = false
    }
  }, [matchId])
  if (teamsData) {
    return <Teams teamsData={teamsData} />
  } else {
    return <Loader />
  }
}
