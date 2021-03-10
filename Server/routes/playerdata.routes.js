module.exports = (app) => {
  const router = require('express').Router()
  const playerdataController = require('../controllers/playersdata.controller')

  //* get all players by current team id
  router.get('/playerdata/:playerid/:matchid', playerdataController.findPlayersDataByPlayerAndMatchId)
  router.get('/playerdata/:matchid', playerdataController.findPlayersDataByMatchId)
  router.get('/scorecard/:matchId', playerdataController.getScoreCardData)
  router.post('/playerdata', playerdataController.createPlayersData)
  router.patch('/playerdata/:playerid/:matchid', playerdataController.updatePlayerData)
  app.use('/api', router)
}
