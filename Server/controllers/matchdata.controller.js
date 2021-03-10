const db = require('../configs/db')
const matchdata = db.matchdata
const matches = db.matches
const teams = db.teams
const routesHandlers = require('../helpers/routes.handler')
const Op = db.Sequelize.Op
exports.createMatchData = (req, res) => {
  const matchData = req.body
  matchdata.create(matchData)
    .then(data => {
      const message = 'match data created successfully'
      routesHandlers.successHandler(res, data, message, 200)
    })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}

exports.getAllMatchData = async (req, res) => {
  try{
    const matchDetails = await matches.findAll({
    order: [['createdAt', 'DESC']],
    attributes: ['team_a_id', 'team_b_id','match_name','toss','result', 'venue', 'start_time','max_overs'],
    include:
    {
      model: matchdata,
      attributes: ['score', 'overs', 'wickets', 'matchId','current_batting_team','current_innings','team_a_score','team_b_score'],
    }
  })
    if (matchDetails.length === 0) {
      
      const message = "no matches found currently...!"
      routesHandlers.successHandler(res,[], message, 200)
    }
    else{
      const data = []
      let i =0
      matchDetails.forEach(async (match) => {
      const teamAId = match.team_a_id
        const teamBId = match.team_b_id
        const currentBattingTeamId = match.matchdatum.current_batting_team
      const teamDetails = await teams.findAll({
        attributes: ['team_name'],
        where: {
          [Op.or]: [{ id: teamAId }, { id: teamBId }]
        }
      })
      if (teamDetails.length === 0) {
        
        const message = "no teams found currently...!"
        routesHandlers.successHandler(res, [], message, 404)
        return 
      }
        const toss = match.toss
        const venue = match.venue
        const startTime = match.start_time
        const result = match.result
        const matchName = match.match_name
        const matchData = match.matchdatum
        const teamOneName = teamDetails[0].team_name
        const teamTwoName = teamDetails[1].team_name
        const currentBattingTeamName = currentBattingTeamId===teamAId?teamOneName:teamTwoName
        const matchId = matchData.matchId
        const max_overs = match.max_overs
        const target = matchData.team_a_score!==0?matchData.team_a_score+1:matchData.team_b_score+1
        data.push({
          teamOneName,
          teamTwoName,
          score: matchData.score,
          wickets: matchData.wickets,
          overs: matchData.overs,
          currentBattingTeam: currentBattingTeamName,
          currentInnings:matchData.current_innings,
          toss,
          target,
          venue,
          result,
          matchId,
          matchName,
          startTime,
          max_overs
        })
        i=i+1
        if (i===matchDetails.length) {
          const message = 'matches retrieved successfully'
          routesHandlers.successHandler(res, data, message, 200)
          return
        }
      })
  }
  }
  catch (err) {
    const message = err.message || "Some error occurred while connecting to database."
    routesHandlers.errorHandler(res,message,500)
  }
}

exports.updateMatchData = async (req, res) => {
  const matchId= req.params.matchId
  const condition = matchId ? { matchId} : null

  matchdata.update(req.body, {
    where: condition,
    returning: true
  })
    .then(num => {

      if (num[0] === 1) {
        const message = 'match data was updated successfully.'
        routesHandlers.successHandler(res, num[1][0], message, 200)
      } else {
        const message = 'Cannot update match data. Maybe match data was not found'
        routesHandlers.successHandler(res,[], message, 404)
      }
    })
    .catch(err => {
      const message = err.message || 'Error updating match data'
      routesHandlers.errorHandler(res, message, 500)
    })
}

exports.getMatchDataByMatchId = async (req, res) => {
  const matchId = req.params.matchId

  try {
    const matchData = await matchdata.findOne({
      attributes:{
        exclude:['strickerId','nonStrickerId','bowlerId','updatedAt','createdAt','id']
      },
      where: {
        matchId
      },
      include: {
        model: matches,
        as:'match',
        attributes:['venue','toss','max_overs','result','isCompleted','start_time']
      }
    })
    if (matchData) {
      const teamDetails = await teams.findAll({
        attributes: ['team_name','id'],
        where: {
          [Op.or]: [{ id: matchData.current_batting_team }, { id: matchData.current_bowling_team }]
        }
      })
      if (teamDetails.length === 0) {
        
        const message = "no teams found currently...!"
        routesHandlers.successHandler(res, [], message, 404)
        return 
      }
      const data = {
        matchData
      }
      teamDetails.map(team=> {
        if(team.id === matchData.current_batting_team) {
          data.battingTeam=team
        } else {
          data.bowlingTeam=team
        }
      })
      const message = 'match data retrieved successfully'
      routesHandlers.successHandler(res, data, message, 200)
    } else {
      const message = 'match data not found in database'
      routesHandlers.successHandler(res,[], message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}