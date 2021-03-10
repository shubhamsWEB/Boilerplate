module.exports = (sequelize, Sequelize) => {
  const players = sequelize.define('players', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    player_name: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
  return players
}
