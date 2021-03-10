export function getMatchDetails(data: any,user: any) {
    data.matchDetails.adminId = user.userId
    const TeamAPlayers: any = []
    const TeamBPlayers: any = []
    Object.values(data.teamA).map((player_name) => {
        if (player_name !== '') TeamAPlayers.push({ player_name })
    })
    Object.values(data.teamB).map((player_name) => {
        if (player_name !== '') TeamBPlayers.push({ player_name })
    })
    const teamsDetails = [
        {
            team_name: data.teamAName,
            ownerId: user.userId,
            players: TeamAPlayers,
        },
        {
            team_name: data.teamBName,
            ownerId: user.userId,
            players: TeamBPlayers,
        },
    ]
    const matchDetails = [data.matchDetails]
    const matchData = {
        teamsDetails,
        matchDetails,
    }
    return matchData
}