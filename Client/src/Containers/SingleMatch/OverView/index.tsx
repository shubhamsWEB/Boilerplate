import React from 'react'
// import { getHighlights } from '../../../api/actions'
import {apiCalls} from 'crickboardapi';
import Loader from '../../../Components/Loader'
import OverViewComponent from '../../../Components/OverView'
import AxiosContext from '../../../context/axios';
type Iprops = {
  matchId: number
}

type IstateProps = {
  highlights: {
    firstInnings: Array<{
      id: number
      innings: number
      ball_number: number
      ball_summary: string
      commentary: string
    }>
    secondInnings: Array<{
      id: number
      innings: number
      ball_number: number
      ball_summary: string
      commentary: string
    }>
  }
}

export default function OverView({ matchId }: Iprops) {
  let axios = React.useContext(AxiosContext);

  const {getHighlights} = apiCalls(axios);
  const [highlights, setHighlights] = React.useState<
    IstateProps['highlights']
  >()
  React.useEffect(() => {
    let mounted = true
    const getHighlightsData = async () => {
      const ballData = await getHighlights(matchId)
      if (!mounted) {
        return
      }
      setHighlights(ballData.data)
    }
    getHighlightsData()
    return () => {
      mounted = false
    }
  }, [matchId])
  if (highlights) {
    return <OverViewComponent highlights={highlights} />
  } else {
    return <Loader />
  }
}