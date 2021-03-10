const { matches } = require('../configs/db')
const db = require('../configs/db')
const teams = db.teams
const routesHandlers = require('../helpers/routes.handler')
exports.getAllTeams = (req, res) => {
  teams.findAll({
    where:{is_registered:true}
  }).then(data => {
    const message = 'Teams retrieved successfully'
    routesHandlers.successHandler(res, data, message, 200)
  }).catch(err => {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  })
}

exports.getTeamById = (req, res) => {
  if (!req.params.teamid) {
    const message = 'Content can not be empty!'
    routesHandlers.errorHandler(res, message, 400)
    return
  }
  const teamid = req.params.teamid
  teams.findOne({ where: { id: teamid } })
    .then(data => {
      const message = 'Team retrieved successfully'
      routesHandlers.successHandler(res, data, message, 200)
    })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}

exports.createTeam = (req, res) => {
  if (!req.body.ownerId || !req.body.team_name) {
    const message = 'Content can not be empty!'
    routesHandlers.errorHandler(res, message, 400)
    return
  }
  const newTeam = {
    team_name: req.body.team_name,
    ownerId: req.body.ownerId,
    is_registered:true
  }
  teams.create(newTeam)
    .then(data => {
      const message = 'Team created successfully'
      routesHandlers.successHandler(res, data, message, 200)
    })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}
exports.updateTeam = async (req, res) => {
  const teamid = req.params.teamid
  const condition = teamid ? { id: teamid } : null

  teams.update(req.body, {
    where: condition
  })
    .then(num => {
      if (num[0] === 1) {
        const message = 'team was updated successfully.'
        routesHandlers.successHandler(res, null, message, 200)
      } else {
        const message = 'Cannot update team. Maybe team was not found'
        routesHandlers.errorHandler(res, message, 404)
      }
    })
    .catch(err => {
      const message = err.message || 'Error updating team'
      routesHandlers.errorHandler(res, message, 500)
    })
}

exports.isOwnerCheck = (req, res) => {
  teams.findOne({
    attributes:['ownerId'],
    where: {
       id: req.params.teamid 
    }
  }).then(data => {
    if (data) {
      if (JSON.stringify (data.ownerId)===req.params.userId) {
        const message = 'user is the owner of this team'
        routesHandlers.successHandler(res, { isOwner: true }, message, 200)
      }
      else {
        const message = 'user is not owner of this team'
        routesHandlers.successHandler(res,{isOwner:false}, message, 200)
      }
    } else {
      const message = 'No team found or you are un authorized'
      routesHandlers.errorHandler(res,message, 403)
    }
  })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}

