import React from 'react'
import VerifyComponent from '../../Components/verifyComponent'
// import { clearCompleteMatchData, verifyMatch ,checkIsMatchVerified} from '../../api/match'
// import { checkTeamOwner } from '../../api/actions'
import { Typography } from '@material-ui/core'
import Loader from '../../Components/Loader'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';
type Iprops = {
  history: { push: Function }
  match: {
    params: { id: string; teamName: string; teamAId: string; teamBId: string }
  }
  loggedinUser: { userName: string; userId: string; expiredDate: Date }
}

function Index({ history, match, loggedinUser }: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {checkTeamOwner,clearCompleteMatchData,verifyMatch,checkIsMatchVerified} = apiCalls(axios);
  const [isOwner, setIsOwner] = React.useState(false)
  const [isVerified,setIsVerified] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [buttonLoading,setButtonLoading] = React.useState(false)
  React.useEffect(() => {
    let mounted = true
    async function isVerifiedCheck() {
      const isVerifiedResponse = await checkIsMatchVerified(match.params.id)
      console.log(isVerifiedResponse)
      setIsVerified(isVerifiedResponse)         
      if (isVerifiedResponse) {
                    setLoading(false)
                    return 
                }
    }
    async function validateTeamOwner() {
      if (Object.keys(loggedinUser).length !== 0 && mounted) {
        setLoading(true)
        const response = await checkTeamOwner(
          match.params.teamBId,
          loggedinUser.userId
        )
        setIsOwner(response)
        setLoading(false)
      } else {
        return
      }
    }
    isVerifiedCheck()
    validateTeamOwner()
    return () => {
      mounted = false
    }
  }, [])
  const handleAcceptChallenge = async () => {
    setButtonLoading(true)
    const response = await verifyMatch(
      {
        matchUpdate: { is_verified: true },
        challengeData: {
          teamAId: match.params.teamAId,
          teamBId: match.params.teamBId,
        },
      },
      match.params.id
    )
    setButtonLoading(false)
    if (response) {
      history.push({
        pathname: `/`,
      })
    }
  }
  const handleRejectChallenge = async () => {
    setButtonLoading(true)
    const response = await clearCompleteMatchData(
      match.params.id,
      match.params.teamAId,
      match.params.teamBId
    )
    setButtonLoading(false)
    if (response) {
      history.push({
        pathname: `/`,
      })
    }
  }
  const headingText = `${match.params.teamName} has challenged you for a match`

  const buttonDetails = [
    { name: 'Accept', handler: handleAcceptChallenge },
    { name: 'reject', handler: handleRejectChallenge },
  ]

  if (loading && !buttonLoading) {
    return (
        <Loader />
    )
  } else if (!isVerified && isOwner && !loading) {
    return (
      <VerifyComponent
        headingText={headingText}
        buttonDetails={buttonDetails}
        loading={buttonLoading}
      />
    )
  } else {
    return (
        <Typography align="center" variant='h5' color='secondary'>
          You have no access to this page.
        </Typography>
    )
  }
}

export default Index
