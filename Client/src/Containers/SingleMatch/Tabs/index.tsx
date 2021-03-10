import React from 'react'
import TabList from '../../../Components/Tabs';
type Iprops = {
  matchId: number,
  data: {
    battingTeam: { team_name: string; id: number },
    bowlingTeam: { team_name: string; id: number },
    matchData: {
      current_batting_team: number,
      current_bowling_team: number,
      current_innings: number,
      isCompleted: number,
      match: {
        isCompleted: number,
        venue: string,
        toss: string,
        max_overs: number,
        result: string
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

export default function ScrollableTabsButtonAuto ({
  matchId,
  data,
}: Iprops) {

  return (
    <TabList matchId={matchId} data={data}/>
  )
}
