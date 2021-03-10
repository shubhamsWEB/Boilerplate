module.exports = (sequelize, Sequelize) => {
  const ballsdata = sequelize.define('ballsdata', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    innings: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    ball_number: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    ball_summary: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    commentary: {
      type: Sequelize.TEXT
    },
    score_summary: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
  return ballsdata
}
