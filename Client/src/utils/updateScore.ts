export const UpdateScore = async (updateLiveScore: any, setLiveData: any, setBalls: any, OpenBowlerModal: any, setWickets: any, setExtras: any, setRuns: any, changeBatsman: any, setLoading: any, runs: any, setSnackBar: any, wickets: any, matchInfo: any, OpenBatsmanModal: any, OpenRunOutModal: any, endInnings: any, extras: any, matchId: any, socket: any, BALL_UPDATED: any, updatePrevScore: any, commentryRef: any, updatedLiveData: any, liveData: any, ballsData: any) => {
    setLoading(true)
    if (runs === null) {
        setSnackBar({ value: true, message: 'Enter Runs', type: 'red' })
        return
    }
    if (wickets === 'Run Out') {
        OpenRunOutModal()
    }
    let commentary = commentryRef.current.value
    const {
        updatedData,
        isWicket,
        batsmanRuns,
        extraRuns,
    } = updatedLiveData(
        liveData,
        commentary,
        ballsData,
        runs,
        extras,
        wickets,
        matchId
    )
    await updateLiveScore(updatedData)
    socket.emit(BALL_UPDATED, {
        room: matchId,
        ...updatedData,
    })
    updatePrevScore(updatedData)
    setLiveData((prevData: any) => {
        const data = { ...prevData }
        const strickerIndex = data.batting.findIndex(
            (player: any) => player.playerId === data.strickerId
        )
        data.batting[strickerIndex] = {
            ...data.batting[strickerIndex],
            ...updatedData.batsmanData,
        }
        data.bowling[0] = { ...data.bowling[0], ...updatedData.bowlerData }
        data.score = liveData.score + batsmanRuns + extraRuns
        data.overs = parseFloat(updatedData.matchData.overs)
        data.wickets = updatedData.matchData.wickets
        return data
    })

    setBalls((prevBalls: any) => {
        const updatedBalls = [...prevBalls]
        updatedBalls.unshift({
            ball_number: updatedData.ballData.ball_number,
            ball_summary: updatedData.ballData.ball_summary,
        })
        return updatedBalls
    })
    setLoading(false)
    if (
        updatedData.matchData.wickets === 10 ||
        parseFloat(updatedData.matchData.overs) === matchInfo.max_overs
    ) {
        endInnings(updatedData.matchData.score)
        return
    }
    if (
        isWicket &&
        parseInt(updatedData.matchData.wickets) !== 10 &&
        wickets !== 'Run Out' &&
        parseFloat(updatedData.matchData.overs) !== matchInfo.max_overs
    ) {
        OpenBatsmanModal()
    }
    if (
        updatedData.bowlerData.overs_bowled % 1 === 0 &&
        parseInt(updatedData.matchData.wickets) !== 10 &&
        parseFloat(updatedData.matchData.overs) !== matchInfo.max_overs
    ) {
        OpenBowlerModal()
    }
    if (runs % 2 !== 0 && updatedData.matchData.overs % 1 !== 0) {
        changeBatsman()
    }
    if (
        liveData.currentInnings === 2 &&
        liveData.inningOneScore < updatedData.matchData.score
    ) {
        endInnings(updatedData.matchData.score)
        return
    }
    if (
        updatedData.matchData.wickets === 10 ||
        parseFloat(updatedData.matchData.overs) === matchInfo.max_overs
    ) {
        endInnings(updatedData.matchData.score)
        return
    }
    setSnackBar({ value: true, message: 'Score Updated', type: 'green' })
    setRuns(0)
    setWickets('Not Out')
    setExtras(0)
}