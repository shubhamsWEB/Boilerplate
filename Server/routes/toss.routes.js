module.exports = (app) => {
    const router = require('express').Router()
    const authHelper = require('../helpers/auth.helpers')
    const tossController = require('../controllers/toss.controller')
    router.patch('/toss/:matchId',authHelper.isLoggedIn,tossController.updateToss)
      app.use('/api', router)
    }
    