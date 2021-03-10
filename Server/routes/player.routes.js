module.exports = (app) => {
  const router = require('express').Router()
  const playerController = require('../controllers/players.controller')

  router.get('/player/:id', playerController.getplayer)
  //* get all players by current team id
  router.get('/player/team/:teamid', playerController.findPlayersByTeamId)

  //router.post('/player', playerController.createPlayers)
  router.post('/player', playerController.addPlayerToTeam)
  router.delete('/player/:id', playerController.deletePlayer)
  router.patch('/player/:id', playerController.updatePlayer)
  app.use('/api', router)
}
