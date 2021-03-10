import React from 'react'
// import { addPlayer } from '../../../api/players'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../../context/axios';
import useLocalStorage from '../../../customHooks/useLocalStorage'
import Modal from '../../../Components/AddPlayerModal'
function Index({ teamId, setPlayers }: any) {
  let axios = React.useContext(AxiosContext);

const {addPlayer} = apiCalls(axios)
  const [open, setOpen] = React.useState(false)
  const PlayerName = React.useRef({} as any)
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

  const handleOnSubmit = async (e: any, TeamId: any) => {
    e.preventDefault()
    if(PlayerName.current.value !== "") {
    const playerData = {
      player_name: PlayerName.current.value,
      teamId: TeamId,
    }
    const response = await addPlayer(playerData)
    setSnackBar({
      value: true,
      message: 'Player Added Successfully',
      type: 'green',
    })
    handleClose()
    setPlayers((oldList: any) => {
      const newPlayerList = [...oldList]
      newPlayerList.push({
        id: response.data.id,
        player_name: response.data.player_name,
        teamId: response.data.teamId,
      })
      return newPlayerList
    })
  } else {
    alert("Enter Player Name");
  }
    // window.location.reload()
  }

  return (
    <Modal
      snackBar={snackBar}
      setSnackBar={setSnackBar}
      handleClose={handleClose}
      handleOpen={handleOpen}
      handleOnSubmit={handleOnSubmit}
      PlayerName={PlayerName}
      open={open}
      teamId={teamId}
    />
  )
}

export default Index
