import React from 'react'
import useLocalStorage from '../../customHooks/useLocalStorage'
import PlayWithTeams from './PlayWithExistingTeam'
// import { getAllTeams } from '../../api/teams'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';
type Iprops = {
  history: { push: Function },
}
const Index = ({ history}: Iprops) => {
  let axios = React.useContext(AxiosContext);

  const {getAllTeams} = apiCalls(axios);
  const [tossModal, setTossModal] = React.useState(false)
  const [teams, setTeams] = React.useState()
  const [user, setUser] = useLocalStorage('user', {})
  React.useEffect(() => {
    if (new Date(user.expiredDate) <= new Date()) {
      setUser({})
      localStorage.setItem('isLoggedIn', JSON.stringify(false))
    }
    let mounted = true
    const initializeDashboard = async () => {
      const allTeams = await getAllTeams()

      if (!mounted) {
        return
      }
      setTeams(allTeams.data)
    }
    initializeDashboard()
  }, [])
  if (teams) {
    return (
      <PlayWithTeams
        tossModal={tossModal}
        teams={teams}
        setTossModal={setTossModal}
        history={history}
        axios={axios}
      />
    )
  } else {
    return <h1>Loading</h1>
  }
}
export default Index
