import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Hidden } from '@material-ui/core'
import {Banner} from './Banner';
import Tabs from './Tabs'
// import { getMatchData,checkMatchAdmin } from '../../api/actions';
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';
import useStyles from './style';
import {socket} from '../../socket';
import {JOIN_MATCH,LEAVE_MATCH,BALL_UPDATED,CHANGE_INNINGS} from '../../Constants/socketEvents'

type Iprops = {
  match: { params: { id: number } },
  loggedinUser: {
    userId: string, userName: string, expiredDate:Date}
}

type IstateProps = {
  matchData: {
    battingTeam: { team_name: string; id: number },
    bowlingTeam: { team_name: string; id: number },
    matchData: {
      current_batting_team: number,
      current_bowling_team: number,
      current_innings: number,
      isCompleted: number,
      match: {
        venue: string,
        toss: string,
        max_overs: number,
        result: string,
        isCompleted: number,
      },
      matchId: number,
      overs: number,
      score: number,
      team_a_overs: number,
      team_a_score: number,
      team_a_wickets: number,
      team_b_overs: number,
      team_b_score: number,
      team_b_wickets: number,
      wickets: number
    }
  }
}

type IsocketData = {
  ballUpdated: {
    ballData: {
      ball_number: number,
      ball_summary: string,
      commentary: string,
      innings: number,
      matchId: number,
      score_summary: string
    },
    batsmanData: {
      balls_faced: number,
      fours: number,
      playerId: number,
      runs: number,
      sixs: number
    },
    batsmanId: number,
    bowlerData: {
      extras: number,
      overs_bowled: number,
      playerId: number,
      runs_given: number,
      wickets: number
    },
    bowlerId: number,
    matchData: {
      overs: string,
      score: number,
      wickets: number,
    },
    room: string
  }
}
export default function Index({
  match,
  loggedinUser
}: Iprops) {
  let axios = React.useContext(AxiosContext);

  const {getMatchData,checkMatchAdmin} = apiCalls(axios);
  const classes = useStyles()
  const [matchId, setMatchId] = React.useState(match.params.id)
  const [matchData, setMatchData] = React.useState<IstateProps["matchData"]>()
  const [isAdmin,setIsAdmin] = React.useState(false)
  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId)
    let mounted = true
    const getData = async () => {
      const MatchData = await getMatchData(matchId)
      if (!mounted) {
        return
      }
      if (Object.keys(loggedinUser).length !== 0) {
        const response = await checkMatchAdmin(matchId, loggedinUser.userId)
       
        setIsAdmin(response)
      }
      setMatchData(MatchData.data)
    }
      if (new Date(loggedinUser.expiredDate) <= new Date()) {
        localStorage.setItem('user', '{}')
        localStorage.setItem('isLoggedIn',JSON.stringify(false))
      }

    getData()

    return () => {
      mounted = false
      socket.emit(LEAVE_MATCH, matchId)
    }
  }, [loggedinUser, matchId])
  React.useEffect(() => {
    socket.on(BALL_UPDATED, (data: any) => {
      setMatchData((prevData:any)=> {
        const updatedData = { ...prevData }
        updatedData.matchData ={...updatedData.matchData,...data.matchData}
        return updatedData;
      })
    })
    socket.on(CHANGE_INNINGS, (data: any) => {
      setMatchData((prevData:any)=> {
        const updatedData = { ...prevData }
        updatedData.matchData ={...updatedData.matchData,currentInnings:data}
        return updatedData;
      })
    })
  },[]);  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Hidden only={['xs', 'sm', 'md']}>
          <Grid item lg={1} />
        </Hidden>
        <Grid
          container
          item
          xs={12}
          lg={10}
          spacing={5}
          className={classes.wrapper}
        >
          <Banner isAdmin={isAdmin} matchId={matchId} data={matchData} />
          <Tabs matchId={matchId} data={matchData}  />
        </Grid>
        <Hidden only={['xs', 'sm', 'md']}>
          <Grid item lg={1} />
        </Hidden>
      </Grid>
    </div>
  )
}