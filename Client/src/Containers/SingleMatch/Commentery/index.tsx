import React, { useEffect } from 'react'
// import { getCommentary} from '../../../api/actions'
import {apiCalls} from 'crickboardapi';
import Commentary from '../../../Components/Commentery'
import { Typography } from '@material-ui/core'
import { socket } from '../../../socket'
import {
  JOIN_MATCH,
  LEAVE_MATCH,
  BALL_UPDATED,
} from '../../../Constants/socketEvents'
import AxiosContext from '../../../context/axios';
type Iprops = {
  id: number
}

type IstateProps = {
  data: Array<{
    ball_number: number,
    ball_summary: string,
    commentary: string,
    innings: number,
    score_summary: string
  }>,
  newData: {
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
function Commentery({ id }: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {getCommentary} = apiCalls(axios);
  const [data, setData] = React.useState<IstateProps['data']>(
    [] as IstateProps['data']
  )
  useEffect(() => {
    socket.emit(JOIN_MATCH, id)
    let mounted = true
    const getData = async () => {
      const CommentaryData = await getCommentary(id)
      if (!mounted) {
        return
      }
      setData(CommentaryData.data)
    }
    getData()
    return () => {
      mounted = false
      socket.emit(LEAVE_MATCH, id)
    }
  }, [id])
  useEffect(() => {
    socket.on(BALL_UPDATED, (newData: IstateProps['newData']) => {
      if (newData.ballData) {
        const { ballData } = newData
        setData((prevData) => {
          const newData = [...prevData]
          newData.unshift({
            ball_summary: ballData.ball_summary,
            ball_number: ballData.ball_number,
            commentary: ballData.commentary,
            score_summary: ballData.score_summary,
            innings: ballData.innings, 
          })
          return newData
        })
      } else {
        setData((prevData) => {
          const newData = [...prevData]
          return newData.slice(1)
        })
      }
    })
  }, [])
  if (data) {
    if (data.length !== 0) {
      return <Commentary data={data} />
    } else {
      return (
        <Typography component='h1' color='secondary' variant='h5'>
          No Ball have been bowled yet
        </Typography>
      )
    }
  } else {
    return <Typography component='h1' color='secondary' variant='h5'>
   Loading
  </Typography>
  }
}
export default Commentery