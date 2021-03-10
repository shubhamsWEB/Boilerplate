import React from 'react'
import Loader from '../../../Components/Loader'
import BannerComponent from '../../../Components/Banner';

type Iprops = {
  matchId: number
  data: {
    battingTeam: { team_name: string; id: number },
    bowlingTeam: { team_name: string; id: number },
    matchData: {
      current_batting_team: number,
      current_bowling_team: number,
      current_innings: number,
      
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
  isAdmin: boolean
}

export const Banner = ({
  matchId,
  data,
  isAdmin
}: Iprops) => {
  if (data) {
    return (
      <BannerComponent isAdmin={isAdmin} matchId={matchId} data={data} />
    )
  } else {
    return <Loader />
  }
}

