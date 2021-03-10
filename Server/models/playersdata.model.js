module.exports = (sequelize, Sequelize) => {
  const playersdata = sequelize.define('playersdata', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    runs: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    wickets: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    balls_faced: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    overs_bowled: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0
    },
    extras: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    fours: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    sixs: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    player_name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    teamId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    maidens: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    out_summary: {
      type: Sequelize.TEXT,
      defaultValue: 'Yet to bat'
    },
    runs_given: {
      type: Sequelize.INTEGER,
      defaultValue:0
    }
  })
  return playersdata
}
