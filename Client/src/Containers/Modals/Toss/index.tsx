import React from 'react'
// import { updateToss } from '../../../api/actions'
import { socket } from '../../../socket'
import {apiCalls} from 'crickboardapi';
import TossModal from '../../../Components/TossModal'
import { TOSS_UPDATED } from '../../../Constants/socketEvents'
import useStyles from './style'
import AxiosContext from '../../../context/axios';
type Iprops = {
  isOpen: boolean
  action: (value: boolean) => void
  matchId: number
  teams: any
  history: any
};

export default function TransitionsModal({
  isOpen,
  action,
  matchId,
  teams,
}: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {updateToss} =apiCalls(axios);
  const classes = useStyles()
  const [wonBy, setWonBy] = React.useState(false)
  const [decision, setDecision] = React.useState('')
  const [openingModal, setOpeningModal] = React.useState(true)
  const [tossResponse, setTossResponse] = React.useState({})

  const handleClose = () => {
    action(false)
  }
  const OpenOpeningModal = () => {
    setOpeningModal(true)
  }
  const handleChangeOnTeam = (event: any) => {
    setWonBy(event.target.value)
  }

  const handleChangeOnDecision = (event: any) => {
    setDecision(event.target.value)
  }

  const handelTossUpdate = async () => {
    const tossStatus = `${wonBy} won the toss and choose to ${decision}`
    const result = 'First Innings In Progress'
    try {
      const data = {
        matchDetails: {
          toss: tossStatus,
          result: result,
        },
        matchDataDetails: {
          current_batting_team:
            (teams.TeamA === wonBy && decision === 'Bat') ||
            (teams.TeamB === wonBy && decision === 'Bowl')
              ? teams.TeamAId
              :teams.TeamBId,
          current_bowling_team:
            (teams.TeamA === wonBy && decision === 'Bat') ||
            (teams.TeamB === wonBy && decision === 'Bowl')
              ? teams.TeamBId
              : teams.TeamAId,
        },
      }
      const response = await updateToss(data, matchId)
      socket.emit(TOSS_UPDATED, {
        matchId: matchId,
        result: result,
        toss: tossStatus,
      })
      setTossResponse(response.data)
      OpenOpeningModal()
      handleClose()
    } catch (error) {
      alert(error)
    }
  }

  return (
    <TossModal
      matchId={matchId}
      openingModal={openingModal}
      setOpeningModal={setOpeningModal}
      isOpen={isOpen}
      teams={teams}
      decision={decision}
      handleChangeOnTeam={handleChangeOnTeam}
      handleChangeOnDecision={handleChangeOnDecision}
      handelTossUpdate={handelTossUpdate}
      tossResponse={tossResponse}
      wonBy={wonBy}
    />
  )
  }