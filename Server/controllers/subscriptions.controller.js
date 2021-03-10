const db = require('../configs/db');
const subscriptions = db.subscriptions;
const Op = db.Sequelize.Op;
const routesHandlers = require('../helpers/routes.handler');

exports.getUserSubscriptions = async (req, res) => {
  const userId = req.params.userId;

  try {
    const subscribedMatches = await subscriptions.findAll({
      attributes: ['id', 'matchId'],
      where: {
        userId: userId,
      },
    });

    const message = 'subscriptions retrieved successfully';
    routesHandlers.successHandler(res, subscribedMatches, message, 200);
  } catch (err) {
    const message =
      err.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.deleteUserSubscriptions = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSubscription = await subscriptions.destroy({
      where: {
        id: id,
      },
    });
    if (deletedSubscription === 1) {
      const message = 'subscription deleted successfully';
      routesHandlers.successHandler(res, null, message, 200);
    } else {
      const message =
        'cannot delete subscription. may be no subscription found with given id.';
      routesHandlers.errorHandler(res, message, 404);
    }
  } catch (error) {
    const message =
      err.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.addUserSubscriptions = async (req, res) => {
  subscriptions
    .create(req.body)
    .then((data) => {
      const message = 'subscription created successfull!';
      routesHandlers.successHandler(res, data, message, 201);
    })
    .catch((err) => {
      const message =
        err.message || 'Some error occurred while creating the subscription.';
      routesHandlers.errorHandler(res, message, 500);
    });
};
