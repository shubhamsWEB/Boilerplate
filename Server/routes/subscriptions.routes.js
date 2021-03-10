module.exports = (app) => {
  const router = require('express').Router();
  const subscriptionController = require('../controllers/subscriptions.controller');

  router.get(
    '/subscription/:userId',
    subscriptionController.getUserSubscriptions
  );

  router.post('/subscription', subscriptionController.addUserSubscriptions);
  //router.delete('/subscription/:matchId/:userId',subscriptionController)
  router.delete(
    '/subscription/:id',
    subscriptionController.deleteUserSubscriptions
  );
  app.use('/api', router);
};
