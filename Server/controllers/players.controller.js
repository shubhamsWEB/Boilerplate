const db = require('../configs/db')
const players = db.players
const routesHandlers = require('../helpers/routes.handler')
//* create players from array of player data

exports.createPlayers = (req, res) => {
  const playersData = req.body
  players.bulkCreate(playersData)
    .then(data => {
      const message = 'players created successfully'
      routesHandlers.successHandler(res, data, message, 200)
    })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}


exports.addPlayerToTeam = (req, res) => {
  const playersData = req.body
  players.create(playersData)
    .then(data => {
      const message = 'player added to team successfully'
      routesHandlers.successHandler(res, data, message, 200)
    })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}

//* get players by current team id

exports.findPlayersByTeamId = async (req, res) => {
  const teamid = req.params.teamid
  const condition = { teamId: teamid }

  try {
    const playersData = await players.findAll({ where: condition, attributes: ['id', 'player_name','teamId'] })
    if (playersData) {
      const message = 'players retrieved successfully'
      routesHandlers.successHandler(res, playersData, message, 200)
    } else {
      const message = 'players not found in database'
      routesHandlers.errorHandler(res, message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}
exports.getplayer = async (req, res) => {
  const id = req.params.id
  const condition = { id: id }

  try {
    const player = await players.findOne({ where: condition })
    if (player) {
      const message = 'players retrieved successfully'
      routesHandlers.successHandler(res, player, message, 200)
    } else {
      const message = 'player not found in database'
      routesHandlers.errorHandler(res, message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}

exports.updatePlayer = async (req, res) => {
  const id = req.params.id
  const condition = id ? { id: id } : null

  players.update(req.body, {
    where: condition
  })
    .then(num => {
      if (num[0] === 1) {
        const message = 'player was updated successfully.'
        routesHandlers.successHandler(res, null, message, 200)
      } else {
        const message = 'Cannot update player. Maybe player was not found'
        routesHandlers.errorHandler(res, message, 404)
      }
    })
    .catch(err => {
      const message = err.message || 'Error updating player'
      routesHandlers.errorHandler(res, message, 500)
    })
}

exports.deletePlayer = (req, res) => {
  const id = req.params.id
  const condition = id ? { id: id } : null

  players.destroy({
    where: condition
  })
    .then(num => {
      if (num === 1) {
        const message = 'player was deleted successfully.'
        routesHandlers.successHandler(res, null, message, 200)
      } else {
        const message = 'Cannot delete player. Maybe player was not found'
        routesHandlers.errorHandler(res, message, 404)
      }
    })
    .catch(err => {
      const message = err.message || 'Error deleting player'
      routesHandlers.errorHandler(res, message, 500)
    })
}
