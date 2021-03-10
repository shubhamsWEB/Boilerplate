export const updateOpeningData = (prevData: any,bowlerData: any,strickerData: any,nonStrickerData: any,bowlerId: any,strickerId: any,nonStrickerId: any) => {
    const newStateData = { ...prevData }
        const battingTeam = newStateData.bowlingTeam
        const bowlingTeam = newStateData.battingTeam
        const inningOneScore = newStateData.score
        const battingTeamName = newStateData.bowlingTeamName
        const bowlingTeamName = newStateData.battingTeamName
        
        newStateData.batting[0] = strickerData
        newStateData.batting[1] = nonStrickerData
        newStateData.bowling[0] = bowlerData
        newStateData.battingTeam = battingTeam
        newStateData.bowlingTeam = bowlingTeam
        newStateData.bowlerId = bowlerId
        newStateData.strickerId = strickerId
        newStateData.nonStrickerId = nonStrickerId
        newStateData.overs = 0
        newStateData.inningOneScore = inningOneScore
        newStateData.score = 0
        newStateData.wickets = 0
        newStateData.currentInnings = newStateData.currentInnings === 1 ? 2 : 1
        newStateData.battingTeamName = battingTeamName
        newStateData.bowlingTeamName = bowlingTeamName
        
        return newStateData
}