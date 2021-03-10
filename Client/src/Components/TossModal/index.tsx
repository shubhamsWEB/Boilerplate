import React from 'react'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Button } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OpeningModal from '../../Containers/Modals/Opening'
// import { updateToss } from '../../api/actions'
import { apiCalls } from 'crickboardapi'
import AxiosContext from '../../context/axios'
import { socket } from '../../socket'
import useStyles from '../../Containers/Modals/Toss/style'
import { TOSS_UPDATED } from '../../Constants/socketEvents'

export default function TransitionsModal({
  isOpen,
  action,
  matchId,
  teams,
  history,
}: any) {
  let axios = React.useContext(AxiosContext);
  const {updateToss} = apiCalls(axios);
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
              : teams.TeamBId,
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
      console.log(error)
    }
  }
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={isOpen}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Toss</h2>
            <Divider />
            <form>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id='team'>Toss won by</InputLabel>
                <Select
                  labelId='team'
                  id='teamWon'
                  value={wonBy}
                  onChange={handleChangeOnTeam}
                >
                  <MenuItem value={teams.TeamA}>{teams.TeamA}</MenuItem>
                  <MenuItem value={teams.TeamB}>{teams.TeamB}</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={{ width: '100%' }}>
                <InputLabel id='electedTo'>Elected to</InputLabel>
                <Select
                  labelId='electedTo'
                  id='decision'
                  value={decision}
                  onChange={handleChangeOnDecision}
                >
                  <MenuItem value='Bat'>BAT</MenuItem>
                  <MenuItem value='Bowl'>BOWL</MenuItem>
                </Select>

                <Button
                  variant='contained'
                  color='primary'
                  className={classes.marginTop}
                  onClick={handelTossUpdate}
                >
                  Start Match
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
      {Object.keys(tossResponse).length !== 0 ? (
        <OpeningModal
          isOpen={openingModal}
          action={setOpeningModal}
          data={{
            battingTeam: (tossResponse as any).currentBattingTeam,
            bowlingTeam: (tossResponse as any).currentBowlingTeam,
          }}
          matchId={matchId}
          history={history}
        />
      ) : null}
    </div>
  )
}
