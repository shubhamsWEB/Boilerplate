// const passport = require('passport')
module.exports = (app) => {
  const router = require('express').Router()
  const authHelper = require('../helpers/auth.helpers')
  const creatematchController = require('../controllers/creatematch.controller')
  router.post('/match', authHelper.isLoggedIn, creatematchController.createCompleteMatch)
  router.post('/match/challenge',authHelper.isLoggedIn, creatematchController.createChallengeMatch)
  app.use('/api', router)
}
