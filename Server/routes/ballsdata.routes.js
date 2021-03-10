module.exports = (app) => {
  const router = require('express').Router()
  const ballsDataController = require('../controllers/ballsdata.controller')
  //*   create ball data
  router.post('/balls/', ballsDataController.createBall)

  //* get ballData by ball id
  router.get('/balls/:id', ballsDataController.getBall)

  //* get balls for a given match id
  router.get('/balls/match/:matchId', ballsDataController.getAllballsByMatch)

  //* get ballData by match and innings
  router.get('/balls/:matchId/:innings', ballsDataController.getAllballsByMatchAndInnings)
  //* get highlight balls
  router.get('/highlights/:matchId', ballsDataController.getHighlightBalls)
  //* get last ten balls
  router.get('/lasttenballs/:matchId', ballsDataController.findLastTenballs)
  //* get fall of wickets
  router.get('/fallofwickets/:matchId',ballsDataController.getFallOfWickets)
  //* update a ball data
  router.patch('/balls/:id', ballsDataController.updateBall)
  //* delete ball data
  router.delete('/balls/:id', ballsDataController.deleteBall) //* change to delete last ball route
  app.use('/api', router)
}
