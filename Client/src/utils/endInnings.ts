
export const endCurrentInnings = async (liveData: any,matchId: any,changeStrick:any) => {
    const patchData = {
      current_innings: 2,
      team_a_score: parseInt(liveData.score),
      team_a_overs: parseFloat(liveData.overs),
      team_a_wickets: parseInt(liveData.wickets + 1),
      score: 0,
      wickets: 0,
      overs: 0.0,
      current_batting_team: liveData.bowlingTeam,
      current_bowling_team: liveData.battingTeam,
    }
    await changeStrick(patchData, matchId)
    const data = { ...liveData }
    data.bowlingTeam = patchData.current_bowling_team
    data.battingTeam = patchData.current_batting_team
    data.current_innings = patchData.current_innings
    data.score = 0
    data.team_a_score = patchData.team_a_score
    data.overs = 0.0
    data.wickets = 0
    return data;
  }