import React from 'react'
import useLocalStorage from '../../../customHooks/useLocalStorage'
import PlayWithTeams from '../../../Components/PlayWithExistingTeam'
// import { getTeamPlayers } from '../../../api/players'
import {apiCalls} from 'crickboardapi';
import PlayerList from '../../../Components/PlayerList'
import AddTeam from '../../Modals/AddTeam'
import AxiosContext from '../../../context/axios';
type Iprops = {
  teamId: number
  playerlist: Array<{}>
  setPlayerList: Function
  addToPlayerList: (player: any) => void
}
const Index = ({ teamId, playerList, setPlayerList, addToPlayerList,teamIndex }: any) => {
  let axios = React.useContext(AxiosContext);
  const [matchId, setMatchId] = React.useState<number>()
  const [players, setPlayers] = React.useState()
  const {getTeamPlayers} = apiCalls(axios)
  const [user, setUser] = useLocalStorage('user', {})
  React.useEffect(() => {
    if (new Date(user.expiredDate) <= new Date()) {
      setUser({})
      localStorage.setItem('isLoggedIn', JSON.stringify(false))
    }
    let mounted = true
    console.log("🚀 ~ file: index.tsx ~ line 28 ~ initializeDashboard ~ teamId", teamId)
    const initializeDashboard = async () => {
      const allPlayers = await getTeamPlayers(teamId)
      if (!mounted) {
        return
      }
      setPlayers(allPlayers.data)
    }
    if(teamId)
    initializeDashboard();
  }, [teamId])

  if (teamId === 0) {
    return <AddTeam />
  } else if (players) {
    return (
      <PlayerList
        teamId={teamId}
        players={players}
        playersList={playerList}
        setPlayerList={setPlayerList}
        addToPlayerList={addToPlayerList}
        setPlayers={setPlayers}
        teamIndex={teamIndex}
        axios={axios}
      />
    )
  } else {
    return <h1>Loading</h1>
  }
}
export default Index
