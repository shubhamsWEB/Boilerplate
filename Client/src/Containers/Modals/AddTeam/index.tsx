import React from 'react'
// import { createTeam } from '../../../api/teams'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../../context/axios';
import useLocalStorage from '../../../customHooks/useLocalStorage'
import Modal from '../../../Components/AddTeamModal'
function Index() {
  let axios = React.useContext(AxiosContext);
  const {createTeam} = apiCalls(axios);
  const [open, setOpen] = React.useState(false)
  const TeamName = React.useRef({} as any)
  const [user, setUser] = useLocalStorage('user', {})
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: '',
    type: '',
  })
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOnSubmit = async (e: any) => {
    e.preventDefault()
    const teamData = {
      team_name: TeamName.current.value,
      ownerId: user.userId,
    }
    const response = await createTeam(teamData)
    setSnackBar({
      value: true,
      message: 'Team Created Successfully',
      type: 'green',
    })
    handleClose()
    window.location.reload()
  }

  return (
    <Modal
      snackBar={snackBar}
      setSnackBar={setSnackBar}
      handleClose={handleClose}
      handleOpen={handleOpen}
      handleOnSubmit={handleOnSubmit}
      TeamName={TeamName}
      open={open}
    />
  )
}

export default Index
