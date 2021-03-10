export function getFormDetails(errors: any) {
    const teamAFormDetails = [{
        name: "teamAName",
        label: "team A Name*",
        error: errors.teamAName,
        helperText: errors.teamAName ? errors.teamAName.message : null,
        validate: true,
        firstElement: true,
    },
    {
        name: "teamA.player1",
        label: "Player 1*",
        error: errors.teamA && errors.teamA.player1,
        helperText: errors.teamA && errors.teamA.player1
            ? errors.teamA.player1.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player2",
        label: "Player 2*",
        error: errors.teamA && errors.teamA.player2,
        helperText: errors.teamA && errors.teamA.player2
            ? errors.teamA.player2.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player3",
        label: "Player 3*",
        error: errors.teamA && errors.teamA.player3,
        helperText: errors.teamA && errors.teamA.player3
            ? errors.teamA.player3.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player4",
        label: "Player 4*",
        error: errors.teamA && errors.teamA.player4,
        helperText: errors.teamA && errors.teamA.player4
            ? errors.teamA.player4.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player5",
        label: "Player 5*",
        error: errors.teamA && errors.teamA.player5,
        helperText: errors.teamA && errors.teamA.player5
            ? errors.teamA.player5.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player6",
        label: "Player 6*",
        error: errors.teamA && errors.teamA.player6,
        helperText: errors.teamA && errors.teamA.player6
            ? errors.teamA.player6.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player7",
        label: "Player 7*",
        error: errors.teamA && errors.teamA.player7,
        helperText: errors.teamA && errors.teamA.player7
            ? errors.teamA.player7.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player8",
        label: "Player 8*",
        error: errors.teamA && errors.teamA.player8,
        helperText: errors.teamA && errors.teamA.player8
            ? errors.teamA.player8.message
            : null,
        validate: true
    },
    {
        name: "teamA.player9",
        label: "Player 9*",
        error: errors.teamA && errors.teamA.player9,
        helperText: errors.teamA && errors.teamA.player9
            ? errors.teamA.player9.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player10",
        label: "Player 10*",
        error: errors.teamA && errors.teamA.player10,
        helperText: errors.teamA && errors.teamA.player10
            ? errors.teamA.player10.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player11",
        label: "Player 11*",
        error: errors.teamA && errors.teamA.player11,
        helperText: errors.teamA && errors.teamA.player11
            ? errors.teamA.player11.message
            : null,
        validate: true,
        firstElement: false
    },
    {
        name: "teamA.player12",
        label: "Player 12",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
    },
    {
        name: "teamA.player13",
        label: "Player 13",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
    },
    {
        name: "teamA.player14",
        label: "Player 14",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
    },
    {
        name: "teamA.player15",
        label: "Player 15",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
    },
    ]
    const teamBFormDetails = [{
        name: "teamBName",
        label: "team B Name*",
        error: errors.teamBName,
        helperText: errors.teamBName ? errors.teamBName.message : null,
        validate: true
    },
    {
        name: "teamB.player1",
        label: "Player 1*",
        error: errors.teamB && errors.teamB.player1,
        helperText: errors.teamB && errors.teamB.player1
            ? errors.teamB.player1.message
            : null,
        validate: true
    },
    {
        name: "teamB.player2",
        label: "Player 2*",
        error: errors.teamB && errors.teamB.player2,
        helperText: errors.teamB && errors.teamB.player2
            ? errors.teamB.player2.message
            : null,
        validate: true
    },
    {
        name: "teamB.player3",
        label: "Player 3*",
        error: errors.teamB && errors.teamB.player3,
        helperText: errors.teamB && errors.teamB.player3
            ? errors.teamB.player3.message
            : null,
        validate: true
    },
    {
        name: "teamB.player4",
        label: "Player 4*",
        error: errors.teamB && errors.teamB.player4,
        helperText: errors.teamB && errors.teamB.player4
            ? errors.teamB.player4.message
            : null,
        validate: true
    },
    {
        name: "teamB.player5",
        label: "Player 5*",
        error: errors.teamB && errors.teamB.player5,
        helperText: errors.teamB && errors.teamB.player5
            ? errors.teamB.player5.message
            : null,
        validate: true
    },
    {
        name: "teamB.player6",
        label: "Player 6*",
        error: errors.teamB && errors.teamB.player6,
        helperText: errors.teamB && errors.teamB.player6
            ? errors.teamB.player6.message
            : null,
        validate: true
    },
    {
        name: "teamB.player7",
        label: "Player 7*",
        error: errors.teamB && errors.teamB.player7,
        helperText: errors.teamB && errors.teamB.player7
            ? errors.teamB.player7.message
            : null,
        validate: true
    },
    {
        name: "teamB.player8",
        label: "Player 8*",
        error: errors.teamB && errors.teamB.player8,
        helperText: errors.teamB && errors.teamB.player8
            ? errors.teamB.player8.message
            : null,
        validate: true
    },
    {
        name: "teamB.player9",
        label: "Player 9*",
        error: errors.teamB && errors.teamB.player9,
        helperText: errors.teamB && errors.teamB.player9
            ? errors.teamB.player9.message
            : null,
        validate: true
    },
    {
        name: "teamB.player10",
        label: "Player 10*",
        error: errors.teamB && errors.teamB.player10,
        helperText: errors.teamB && errors.teamB.player10
            ? errors.teamB.player10.message
            : null,
        validate: true
    },
    {
        name: "teamB.player11",
        label: "Player 11*",
        error: errors.teamB && errors.teamB.player11,
        helperText: errors.teamB && errors.teamB.player11
            ? errors.teamB.player11.message
            : null,
        validate: true
    },
    {
        name: "teamB.player12",
        label: "Player 12",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
    },
    {
        name: "teamB.player13",
        label: "Player 13",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
    },
    {
        name: "teamB.player14",
        label: "Player 14",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
        
    },
    {
        name: "teamB.player15",
        label: "Player 15",
        error: false,
        helperText: null,
        validate: false,
        firstElement: false
    },
    ]
    const matchFormDetails = [
        {
            name: 'matchDetails.match_name',
            numberType: false,
            label: "Match Name*",
            error: errors.matchDetails && errors.matchDetails.match_name,
            helperText: errors.matchDetails && errors.matchDetails.match_name
                ? errors.matchDetails.match_name.message
                : null
        },
        {
            name: 'matchDetails.venue',
            numberType: false,
            label: "Venue*",
            error: errors.matchDetails && errors.matchDetails.venue,
            helperText: errors.matchDetails && errors.matchDetails.venue
                ? errors.matchDetails.venue.message
                : null
        },
        {
            name: 'matchDetails.max_overs',
            numberType: true,
            label: "overs*",
            error: errors.matchDetails && errors.matchDetails.max_overs,
            helperText: errors.matchDetails && errors.matchDetails.max_overs
                ? errors.matchDetails.max_overs.message
                : null
        },
    ]
    return {
        teamAFormDetails,
        teamBFormDetails,
        matchFormDetails
    }
}