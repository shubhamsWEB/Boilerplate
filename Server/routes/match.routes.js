// const passport = require('passport')
module.exports = (app) => {
  const router = require('express').Router()
  const matchController = require('../controllers/match.controller')

  // router.post('/match', matchController.createMatch)
  router.get('/match/isverified/:matchId', matchController.getMatchIsVerified)
  router.get('/matchinfo/:matchId', matchController.getMatch)
  router.get('/matchadmincheck/:matchId/:userId', matchController.isAdminCheck)
  router.delete('/match/:matchId/:teamAId/:teamBId',matchController.clearChallengeMatch)
  router.patch('/matchinfo/:matchId', matchController.updateMatch)
  router.patch('/match/verify/:matchId', matchController.verifyMatch)
  router.get('/match/isauthorized/:matchId/:teamId/:userId',matchController.isValidChallengePage)
  app.use('/api', router)
}
