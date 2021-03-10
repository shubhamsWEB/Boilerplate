// const passport = require('passport')
module.exports = (app) => {
  const router = require('express').Router()
  const teamController = require('../controllers/teams.controller')

  router.get('/team', teamController.getAllTeams)
  router.get('/team/:teamid', teamController.getTeamById)
  router.get('/teamownercheck/:teamid/:userId', teamController.isOwnerCheck)

  router.post('/team', teamController.createTeam)

  router.patch('/team/:teamid', teamController.updateTeam)
  app.use('/api', router)
}
