module.exports = (sequelize, Sequelize) => {
  const subscriptions = sequelize.define('subscriptions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return subscriptions;
};
