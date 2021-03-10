module.exports = (app) => {
  const router = require('express').Router()
  const authHelper = require('../helpers/auth.helpers')
    const livematchController = require('../controllers/livematch.controller')
  
   router.get('/livematch/:matchId',livematchController.getLiveMatch)
  router.get('/livematchdata/:matchId',livematchController.getLiveMatchData)
  router.post('/livematch', authHelper.isLoggedIn, livematchController.adminMatchUpdate)
  router.patch('/livematch/:ballId', authHelper.isLoggedIn, livematchController.adminMatchUndo)
  router.patch('/playerstats/:matchId',livematchController.updateMatchAndPlayerData)
    app.use('/api', router)
  }
  
