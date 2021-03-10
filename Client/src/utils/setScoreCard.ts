export const updateScoreCard = (prevData: any,data: any,newData: any) => {
    const stateData = { ...prevData }
        if (data.matchData.current_innings === 1) {
          const battingIndex = stateData.Innings[0].batting.findIndex(
            (player: any) => player.playerId === newData.batsmanId
          )
          stateData.Innings[0].batting[battingIndex] = {
            ...stateData.Innings[0].batting[battingIndex],
            ...newData.batsmanData,
          }
  
          const bowlingIndex = stateData.Innings[0].bowling.findIndex(
            (player: any) => player.playerId === newData.bowlerId
          )
          stateData.Innings[0].bowling[bowlingIndex] = {
            ...stateData.Innings[0].bowling[bowlingIndex],
            ...newData.bowlerData,
          }
          stateData.firstInningsHighlights.push(newData.ballData)
        } else {
          const battingIndex = stateData.Innings[1].batting.findIndex(
            (player: any) => player.playerId === newData.batsmanId
          )
          stateData.Innings[1].batting[battingIndex] = {
            ...stateData.Innings[1].batting[battingIndex],
            ...newData.batsmanData,
          }
  
          const bowlingIndex = stateData.Innings[1].bowling.findIndex(
            (player: any) => player.playerId === newData.bowlerId
          )
          stateData.Innings[1].bowling[bowlingIndex] = {
            ...stateData.Innings[1].bowling[bowlingIndex],
            ...newData.bowlerData,
          }
          stateData.secondInningsHighlights.push(newData.ballData)
        }
        return stateData
}
