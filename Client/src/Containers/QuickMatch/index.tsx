import React from 'react'
import { useForm } from 'react-hook-form'
// import { createMatch } from '../../api/actions'
import {apiCalls} from 'crickboardapi';
import useLocalStorage from '../../customHooks/useLocalStorage'
import { getFormDetails } from '../../utils/formData'
import { socket } from '../../socket'
import { getMatchDetails } from '../../utils/getMatchDetails'
import {
  MATCH_CREATED,
} from '../../Constants/socketEvents'
import QuickMatch from '../../Components/QuickMatch'
import {Container} from '@material-ui/core'
import AxiosContext from '../../context/axios';
type Iprops = {
  history: { push: Function }
}

type functionParams = {
  onFormSubmit: {
    teamsDetails: Array<{
      team_name: string
      ownerId: string
      players: Array<{
        player_name: string
      }>
    }>
    matchDetails: {
      match_name: string
      max_overs: number
      venue: string
      adminId: string
    }
  }
}
export default function Index({ history }: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {createMatch} = apiCalls(axios);
  const [tossModal, setTossModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })
  const [matchId, setMatchId] = React.useState<number>()
  const [teams, setTeams] = React.useState({
    TeamA: '',
    TeamAId: '',
    TeamBId: '',
    TeamB: '',
  })
  const [user, setUser] = useLocalStorage('user', {})
  React.useEffect(() => {
    if (new Date(user.expiredDate) <= new Date()) {
      setUser({})
      localStorage.setItem('isLoggedIn', JSON.stringify(false))
    }
  })

  const onFormSubmit = async (data: functionParams['onFormSubmit']) => {
    setLoading(true)
    const matchData = getMatchDetails(data, user)

    const response = await createMatch(matchData)
    if (response.status === 201) {
      socket.emit(MATCH_CREATED, {
        matchId: response.data.data.matchId,
        matchName: data.matchDetails.match_name,
        max_overs: data.matchDetails.max_overs,
        venue: data.matchDetails.venue,
        teamOneName: response.data.data.teamAName,
        teamTwoName: response.data.data.teamBName,
        currentInnings: 1,
        overs: 0,
        result: 'Match yet to start',
        score: 0,
        toss: 'waiting for toss',
        startTime: new Date().toISOString(),
        wickets: 0,
      })
      setMatchId(response.data.data.matchId)
      setTeams({
        TeamAId: response.data.data.teamAId,
        TeamBId: response.data.data.teamBId,
        TeamA: response.data.data.teamAName,
        TeamB: response.data.data.teamBName,
      })
      setLoading(false)
      setTossModal(true)
    }
  }
  const formFieldDetails = getFormDetails(errors)

  return (
    <Container>
    <QuickMatch
      register={register}
      loading={loading}
      handleSubmit={handleSubmit}
      formFieldDetails={formFieldDetails}
      onFormSubmit={onFormSubmit}
      tossModal={tossModal}
      teams={teams}
      setTossModal={setTossModal}
      matchId={matchId}
      history={history}
    />
    </Container>
  )
}
