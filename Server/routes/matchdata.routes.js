// const passport = require('passport')
module.exports = (app) => {
  const router = require('express').Router()
  const matchDataController = require('../controllers/matchdata.controller')

  router.get('/matchdata', matchDataController.getAllMatchData)
  router.get('/matchdata/:matchId', matchDataController.getMatchDataByMatchId)

  // router.post('/matchdata', matchDataController.createMatchData)
  router.patch('/matchdata/:matchId',matchDataController.updateMatchData)
  app.use('/api', router)
}
