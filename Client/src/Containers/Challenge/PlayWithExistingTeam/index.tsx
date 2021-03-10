import React from 'react'
import Component from '../../../Components/PlayWithExistingTeam'
import useLocalStorage from '../../../customHooks/useLocalStorage'
import { useForm } from 'react-hook-form'
// import { createChallengeMatch } from '../../../api/match'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../../context/axios';
type IstateProps = {
  team: {
    id: number
    team_name: string
    createdAt: Date
    updatedAt: Date
    ownerId: number
  }
  playerlist: Array<{
    player_name: string
    teamId: number
    id?: number
    playerId?: number
  }>
}
export default function Index({
  tossModal,
  setTossModal,
  history,
  teams,
}: any) {
  let axios = React.useContext(AxiosContext);

  const [teamA, setTeamA] = React.useState<IstateProps['team']>(
    {} as IstateProps['team']
  )
  const [teamB, setTeamB] = React.useState<IstateProps['team']>(
    {} as IstateProps['team']
  )
  // const [tossTeams, setTossTeams] = React.useState({
  //   TeamA: teamA.team_name,
  //   TeamAId: teamA.id,
  //   TeamBId: teamB.id,
  //   TeamB: teamB.team_name,
  // })
  const {createChallengeMatch} = apiCalls(axios);
  const [matchId, setMatchId] = React.useState<number>()
  const [playerList, setPlayerList] = React.useState<IstateProps['playerlist']>(
    [] as IstateProps['playerlist']
  )
  const [user, setUser] = useLocalStorage('user', {})
  const [loading,setLoading] = React.useState(false)
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })
  const handelOnCreateMatch = async (data: any) => {
    console.log(data)
    setLoading(true)
    var i
    for (i = 0; i < playerList.length; i++) {
      playerList[i].playerId = playerList[i]['id']
      delete playerList[i].id
    }
    const Data = {
      matchData: {
        match_name: data.matchName,
        team_a_id: teamA.id,
        team_b_id: teamB.id,
        max_overs: data.overs,
        venue: data.matchVenue,
        adminId: user.userId,
        start_time: data.matchTime
      },
      matchDetails: {
        current_batting_team: teamA.id,
        current_bowling_team: teamB.id,
        strickerId: playerList[0].id,
        nonStrickerId: playerList[1].id,
        bowlerId: playerList[playerList.length - 1].id,
      },
      playersData: playerList,
    }
    const response = await createChallengeMatch(Data)
    if (response.status === 201) {
      if (teamB.ownerId === user.userId) {
        setLoading(false)
        setMatchId(response.data.data.matchId)
        setTossModal(true)
      } else {
        setLoading(false)
        history.push('/')
      }
    }
    else {
      setLoading(false)
    }
  }
  
  
  const addToPlayerList = (player: any) => {
    const PlayerIndex = playerList.findIndex(function (obj: any) {
      return obj.id === player.id
    })
    if (PlayerIndex === -1) {
      setPlayerList((oldList): any => [...oldList, player])
    } else {
      const newList = [...playerList]
      newList.splice(PlayerIndex, 1)
      setPlayerList(newList)
    }
  }
  return (
    <Component
      teamA={teamA}
      setTeamA={setTeamA}
      teamB={teamB}
      setTeamB={setTeamB}
      tossModal={tossModal}
      teams={teams}
      setTossModal={setTossModal}
      matchId={matchId}
      history={history}
      handelOnCreateMatch={handelOnCreateMatch}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      playerList={playerList}
      setPlayerList={setPlayerList}
      addToPlayerList={addToPlayerList}
      loading={loading}
      axios={axios}
      // tossTeams={tossTeams}
      // setTossTeams={setTossTeams}
    />
  )
}
