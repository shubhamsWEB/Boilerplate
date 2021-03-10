import React from 'react'
// import { checkTeamOwner } from '../../api/actions'
import TossModal from '../../Components/TossModal'
import Loader from '../../Components/Loader'
import { Typography } from '@material-ui/core'
// import {
//   checkMatchAdmin,
//   checkIsMatchVerified,
//   checkisAuthorized,
// } from '../../api/match'
import { apiCalls } from 'crickboardapi'
import AxiosContext from '../../context/axios';
type Iprops = {
  history: { push: Function }
  match: {
    params: {
      matchId: number
      teamAName: string
      teamBName: string
      teamAId: string | number
      teamBId: string | number
    }
  }
  loggedinUser: { userName: string; userId: string; expiredDate: Date }
}

function Index({ history, match, loggedinUser }: any) {
  let axios = React.useContext(AxiosContext);

  const [tossModal, setTossModal] = React.useState(false)
  const [teams, setTeams] = React.useState({
    TeamA: '',
    TeamAId: '',
    TeamBId: '',
    TeamB: '',
  })
  const { checkisAuthorized } = apiCalls(
    axios
  )
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    let mounted = true
    async function validateTeamOwner() {
      if (Object.keys(loggedinUser).length !== 0 && mounted) {
        setLoading(true)
        const isAuthorizedResponse = await checkisAuthorized(
          match.params.matchId,
          match.params.teamAId,
          loggedinUser.userId
        )

        console.log(isAuthorizedResponse)
        setIsAuthorized(isAuthorizedResponse)
        setTeams({
          TeamAId: match.params.teamAId,
          TeamBId: match.params.teamBId,
          TeamA: match.params.teamAName,
          TeamB: match.params.teamBName,
        })
        setTossModal(true)
        setLoading(false)
      } else {
        return
      }
    }
    validateTeamOwner()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return <Loader />
  } else if (!loading && isAuthorized) {
    return (
      <TossModal
        isOpen={tossModal}
        action={setTossModal}
        teams={teams}
        matchId={match.params.matchId}
        history={history}
      />
    )
  } else {
    return (
      <Typography variant='h5' color='secondary'>
        You have no access to this page.
      </Typography>
    )
  }
}

export default Index
